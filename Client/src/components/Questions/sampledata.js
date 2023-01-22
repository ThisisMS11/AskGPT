const sampledata = [
    {
        "attributes": {
            "color": "var(--black-700)",
            "link": "https://stackoverflow.com/questions/23703850/delete-item-from-specific-location-in-list-in-python"
        },
        "insert": "Delete Item from specific location in list in Python [duplicate]"
    },
    {
        "attributes": {
            "header": 1
        },
        "insert": "\n"
    },
    {
        "attributes": {
            "background": "var(--_bu-bg)",
            "color": "var(--_bu-fc)",
            "link": "https://stackoverflow.com/questions/ask"
        },
        "insert": "Ask Question"
    },
    {
        "insert": "\n"
    },
    {
        "attributes": {
            "color": "var(--fc-light) "
        },
        "insert": "Asked"
    },
    {
        "insert": " 8 years, 8 months ago\n"
    },
    {
        "attributes": {
            "color": "var(--fc-light) "
        },
        "insert": "Modified"
    },
    {
        "insert": " "
    },
    {
        "attributes": {
            "color": "inherit",
            "link": "https://stackoverflow.com/questions/23703850/delete-item-from-specific-location-in-list-in-python?lastactivity"
        },
        "insert": "4 years, 8 months ago"
    },
    {
        "insert": "\n"
    },
    {
        "attributes": {
            "color": "var(--fc-light) "
        },
        "insert": "Viewed"
    },
    {
        "insert": " 2k times\n\n\n0\n\n\n\n"
    },
    {
        "attributes": {
            "bold": true
        },
        "insert": "This question already has answers here"
    },
    {
        "insert": ":\n"
    },
    {
        "attributes": {
            "color": "var(--theme-link-color)",
            "link": "https://stackoverflow.com/questions/627435/how-to-remove-an-element-from-a-list-by-index"
        },
        "insert": "How to remove an element from a list by index"
    },
    {
        "insert": " (18 answers)\nClosed 8 years ago.\nI'm writing a statistics program which will maintain a list of float values. The program will implement the following menu:\nAdd value to list"
    },
    {
        "attributes": {
            "list": "ordered"
        },
        "insert": "\n"
    },
    {
        "insert": "Delete value from list (by value)"
    },
    {
        "attributes": {
            "list": "ordered"
        },
        "insert": "\n"
    },
    {
        "insert": "Delete value from list (by location in list)"
    },
    {
        "attributes": {
            "list": "ordered"
        },
        "insert": "\n"
    },
    {
        "insert": "Display list"
    },
    {
        "attributes": {
            "list": "ordered"
        },
        "insert": "\n"
    },
    {
        "insert": "Exit"
    },
    {
        "attributes": {
            "list": "ordered"
        },
        "insert": "\n"
    },
    {
        "insert": "I've written everything except the third option. I can't figure out how to get it done. How would one do that?\n\n\n"
    },
    {
        "attributes": {
            "width": "500"
        },
        "insert": {
            "image": "data:image/jpeg;base64,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"
        }
    },
    {
        "attributes": {
            "indent": 2
        },
        "insert": "\n"
    }
]


const replies = [
    {
        "name": "Mohit Saini",
        "message": "en years ago, I was just starting out in my career as a developer. Back then, I was using subversion for my version control—then I came across Git. I remember how thrilled I was to find that Git worked way better than subversion. Subversion requires a workaround just to have branches. In Git, branching is a first-class citizen: explicitly available without your having to use weird workarounds. Merging code is a lot smoother in Git as well. ",
        "time": "22/10/23"
    },
]

export { sampledata, replies };