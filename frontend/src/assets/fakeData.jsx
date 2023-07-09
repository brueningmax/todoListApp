export const fakeData = [
    {
        "user": {
            "id": 1,
            "name": "Not assigned"
        },
        "todos": [
            {
                "id": 3,
                "priority": "high",
                "type": "Salary",
                "notes": "Something",
                "status": "open",
                "nextTodo": null,
                "previousTodo": null,
                "month": "apr",
                "year": 2023,
                "user": 1,
                "client": {
                    "id": 1,
                    "name": "Whaterver AG",
                    "address": "somewhere in world",
                    "contact": "Ich nicht"
                }
            }
        ]
    },
    {
        "user": {
            "id": 3,
            "name": "Admin"
        },
        "todos": [
            null
        ]
    },
    {
        "user": {
            "id": 2,
            "name": "Compleated"
        },
        "todos": [
            {
                "id": 1,
                "priority": "high",
                "type": "Salary",
                "notes": "Something",
                "status": "completed",
                "nextTodo": 2,
                "previousTodo": null,
                "month": "apr",
                "year": 2023,
                "user": 2,
                "client": {
                    "id": 1,
                    "name": "Whaterver AG",
                    "address": "somewhere in world",
                    "contact": "Ich nicht"
                }
            },
            {
                "id": 2,
                "priority": "high",
                "type": "Salary",
                "notes": "Something",
                "status": "completed",
                "nextTodo": null,
                "previousTodo": 1,
                "month": "apr",
                "year": 2023,
                "user": 2,
                "client": {
                    "id": 1,
                    "name": "Whaterver AG",
                    "address": "somewhere in world",
                    "contact": "Ich nicht"
                }
            }
        ]
    }
]