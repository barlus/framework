const TAGS = {
    _: [ '<em>', '</em>' ],
    __: [ '<strong>', '</strong>' ],
    '\n\n': [ '<br />' ],
    '>': [ '<blockquote>', '</blockquote>' ],
    '*': [ '<ul>', '</ul>' ],
    '#': [ '<ol>', '</ol>' ]
};
const Types = {
    _: 'italic',
    __: 'bold',
    '\n\n': 'break',
    '>': 'blockquote',
    '*': 'ul',
    '#': 'ol'
};
/** Outdent a string based on the first indented line's leading whitespace
 *    @private
 */
function outdent(str) {
    return str.replace(RegExp('^' + (str.match(/^(\t| )+/) || '')[ 0 ], 'gm'), '');
}

/** Encode special attribute characters to HTML entities in a String.
 *    @private
 */
function encodeAttr(str) {
    return str.replace(/"/g, '&quot;');
}
const rx = [
    /(?:^```(\w*)\n([\s\S]*?)\n```$)/,// multiline code
    /((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)/, //whitespace
    /((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)/, //list start
    /(?:\!\[([^\]]*?)\]\(([^\)]+?)\))/, //image
    /(\[)/,
    /(\](?:\(([^\)]+?)\))?)/,
    /(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))/,
    /(?:(?:^|\n+)(#{1,3})\s*(.+)(?:\n+|$))/,
    /(?:`([^`].*?)`)/,
    /(  \n\n*|\n{2,}|__|\*\*|[_*])/,
].map(x => x.toString().replace(/^.(.*).$/, '$1')).join('|');
// /gm
console.info(rx);
function parse(md) {
    // eslint-disable-next-line
    const tokenizer = new RegExp(`${rx}`, 'gm'),
        context: any = [];
    let out = '',
        last = 0;
    const links = {};
    let chunk, prev, token, inner, t;

    function tag(token) {
        const norm = token.replace(/\*/g, '_').replace(/^( {2}\n\n*|\n{2,})/g, '\n\n'),
            end = context[ context.length - 1 ] === token;
        let desc = TAGS[ norm ];
        if (!desc) {
            return token;
        }
        if (!desc[ 1 ]) {
            return desc[ 0 ];
        }
        if (end) {
            console.info("POP", context.pop());
        } else {
            console.info("PUSH", token);
            context.push(token)
        }
        return desc[ end ? 1 : 0 ];
    }

    function flush() {
        let str = '';
        for (let i = context.length; i--;) {
            const text = tag(context[ i ]);
            console.info({ type: context[ i ], content: text });
            str += text
        }
        return str;
    }

    md = md.replace(/^\n+|\n+$/g, '').replace(/^\[(.+?)\]:\s*(.+)$/gm, function (s, name, url) {
        links[ name.toLowerCase() ] = url;
        return '';
    });

    while ((token = tokenizer.exec(md))) {
        prev = md.substring(last, token.index);
        last = tokenizer.lastIndex;
        chunk = token[ 0 ];
        if (prev.match(/[^\\](\\\\)*\\$/)) {
            // escaped
        }
        // Code/Indent blocks:
        else if (token[ 2 ] || token[ 3 ]) {
            const poetry = token[ 3 ] ? 'poetry' : token[ 1 ].toLowerCase();
            const content = outdent((token[ 2 ] || token[ 3 ]).replace(/^\n+|\n+$/g, ''));
            console.info({
                poetry: poetry,
                content: content
            });
            chunk = '<pre class="code ' + (poetry) + '">' + content + '</pre>';
        }
        // > Quotes, -* lists:
        else if (token[ 5 ]) {
            t = token[ 5 ];
            if (t.charAt(t.length - 1) === '.') {
                t = '.';
                token[ 4 ] = token[ 4 ].replace(/^\d+/gm, '');
            }
            inner = parse(outdent(token[ 4 ].replace(/^\s*[>*+.-]/gm, '')));
            if (t !== '>') {
                t = t === '.' ? '#' : '*';
                inner = inner.replace(/^(.*)(\n|$)/gm, '<li>$1</li>');
            }
            console.info({ type: t, content: inner });
            chunk = TAGS[ t ][ 0 ] + inner + TAGS[ t ][ 1 ];
        }
        // Images:
        else if (token[ 7 ]) {
            const src = encodeAttr(token[ 7 ]);
            const alt = encodeAttr(token[ 6 ])
            console.info({ type: 'image', src, alt });
            chunk = "<img src=\"" + (src) + "\" alt=\"" + (alt) + "\">";
        }
        // Links:
        else if (token[ 9 ]) {
            const href = encodeAttr(token[ 10 ] || links[ prev.toLowerCase() ]);

            out = out.replace('<a>', ("<a href=\"" + href + "\">"));
            console.info({ type: 'link', href });
            const content = flush();
            chunk = content + '</a>';
        }
        else if (token[ 8 ]) {
            chunk = '<a>';
        }
        // Headings:
        else if (token[ 11 ] || token[ 13 ]) {
            t = 'h' + (token[ 13 ] ? token[ 13 ].length : (token[ 12 ][ 0 ] === '=' ? 1 : 2));
            const content = parse(token[ 11 ] || token[ 14 ]);
            console.info({ type: t, content });
            chunk = '<' + t + '>' + parse(token[ 11 ] || token[ 14 ]) + '</' + t + '>';
        }
        // `code`:
        else if (token[ 15 ]) {
            const content = token[ 15 ];
            console.info({ type: 'code', content });
            chunk = '<code>' + content + '</code>';
        }
        // Inline formatting: *em*, **strong** & friends
        else if (token[ 16 ]) {
            chunk = tag(token[ 16 ]);
        }
        out += prev;
        out += chunk;
    }

    return (out + md.substring(last) + flush()).trim();
}

export default parse;