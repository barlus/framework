
import { suite, test } from '@barlus/tester/decorators';


const EXAMPLE = `## Snarkdown

![snarkdown](http://emojipop.net/data/images/emoji_set_77.png)

*[Snarkdown](http://github.com/developit/snarkdown)* is __easy__ to \`use\`!

Here's an [**important** anchor link](#example).

Two newlines creates a line break.

Or, end a line with two spaces.  
Just like that!

Code & Poetry
-------------

    You can also indent
    blocks to display
    code or poetry.
    
    Indented code/poetry blocks  
    can be hard-wrapped.

**Or, wrap your code in three backticks:**

\`\`\`JavaScript
function codeBlocks() {
    return 'Can be inserted';
}
\`\`\`


### Block Quotes

> You can insert quotes by
> preceeding each line with \`>\`.
>
> Blockquotes can also contain line  
> breaks.


## Lists

- Unordered
* Lists
+ Of mixed type

1. Ordered
2. Lists
4. Numbers are ignored`;


@suite
class BasicTest {
    @test
    testBasicSum() {

    }
}
