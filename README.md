About
====
CopyCatJS is a directive-oriented meta-programming and meta-documentation aid for JavaScript.

`arguceptor`, `coalescer`, `erup`

Partially Implemented
====

Arguceptor
----

Wrap a function in such a way as to intercept it's arguments and return value.

Coalescer
----

Recursively merge a set of data to produce a set of data which encompases all possible keys.

For example:

This structure

    {
      contacts: [
        {
          first: "bob",
          last: "dole"
        },
        {
          first: "mary",
          phone: "(555) 555-5555"
        }
      ]
    }

Would become this structure

    {
      contacts: [
        first: "bob",
        last: "dole",
        phone: "(555) 555-5555"
      ]
    }

**NOTE**: This works only on values of the same type (array, object, or literal).

This would produce undefined results:

    {
      contacts: [
        { 
          name: "bob dole"
        },
        { 
          name: {
            first: "mary",
            last: "jane",
        }
      ]
    }

ERUP
----

PURE.js in reverse. Scrapes HTML to produce input.

WIP
====

  * Convert JSON document to `C structs` (`.h` files)

Not Yet Implemented
----

  * Convert from JSON to csv
  * Convert from csv to JSON
  * Convert from XML to JSON (lossy, requires schema)

Things I don't think I care to implement
----

  * Convert from JSON to XML
