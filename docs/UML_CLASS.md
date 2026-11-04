# UML Class Diagram: Fright Night Costume Contest

```mermaid
classDiagram
    class User {
        +String username
        -String passwordHash
        +login(password) bool
        +logout() void
    }

    class Costume {
        +int id
        +String name
        +String description
        +Category category
        +int voteCount
        +delete(requester: User) void
    }

    class Vote {
        +User voter
        +Costume costume
        +DateTime timestamp
    }

    class Category {
        <<enumeration>>
        SPOOKY
        FUNNY
        CREATIVE
    }

    class VoteService {
        +castVote(voter: User, costume: Costume) Vote
        +votesRemaining(voter: User) int
    }

    class Leaderboard {
        +getRankings() List~Costume~
    }

    User "1" --> "0..*" Costume : submits
    User "1" --> "0..3" Vote : casts
    Vote "0..*" --> "1" Costume : for
    Costume --> Category : has
    VoteService ..> Vote : creates
    Leaderboard ..> Costume : ranks
```

## Notes on the Design

| Element | Notes |
|---|---|
| `User.passwordHash` | Only the hash is stored, never the password itself. |
| `Costume.voteCount` | Always an integer. Starts at 0. |
| `Costume.delete(requester)` | Throws an error if `requester` is not the costume's owner. |
| `VoteService.castVote()` | Rejects the vote if the voter is not logged in, has no votes left, owns the costume, or already voted for it. |
| `Leaderboard.getRankings()` | Returns costumes sorted by `voteCount`, **highest first**. |
| `User` to `Vote` | A user can cast between 0 and 3 votes. |
