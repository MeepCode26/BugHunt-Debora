# UML Sequence Diagram: Casting a Vote

This diagram shows what happens when a guest clicks **Vote** on a costume.

```mermaid
sequenceDiagram
    actor Voter
    participant UI as Browser UI
    participant API as Contest API
    participant Auth as Auth Service
    participant VS as Vote Service
    participant DB as PostgreSQL

    Voter->>UI: Click Vote on a costume
    UI->>API: POST /votes with costumeId and session token
    API->>Auth: validateSession(token)

    alt session invalid or missing
        Auth-->>API: 401 Unauthorized
        API-->>UI: Error
        UI-->>Voter: Please log in to vote
    else session valid
        Auth-->>API: User
        API->>VS: castVote(user, costume)
        VS->>DB: Check deadline, votes used, costume owner, and existing votes

        alt any rule violated
            VS-->>API: Rejected with reason
            API-->>UI: 400 Bad Request
            UI-->>Voter: Show the reason
        else all rules pass
            VS->>DB: INSERT vote
            VS->>DB: voteCount = voteCount + 1
            VS-->>API: Vote
            API-->>UI: 201 Created
            UI-->>Voter: Vote counted, with votes remaining
        end
    end
```

## Rules Checked by the Vote Service

1. Voting has not closed (REQ-13)
2. The voter has used fewer than 3 votes (REQ-09)
3. The voter does not own the costume (REQ-10)
4. The voter has not already voted for this costume (REQ-11)
