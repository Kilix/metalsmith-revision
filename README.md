# Metalsmith-revision

Allow metalsmith to only compile changed file based on hash's files.

## Setup

You need to deactivate the clean options in metalsmith:

```javascript
  import Metalsmith from 'metalsmith'
  import revision from 'metalsmith-revision'

  Metalsmith()
    .clean(false)
    .revision()
    .build()

```

The package should be called at the end of your workflow (behind layout, etc) to take into account modification on layout, markdown, etc.

----

Do not hesitate to participate, issue, PR, etc
Have fun and be nice :-)
