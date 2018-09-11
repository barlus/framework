import {Crypto}              from '@barlus/bone/node/crypto';
import {suite, test, expect} from '@barlus/tester';
import {FreeStyle}           from '@barlus/styles/core/FreeStyle';


@suite('free style')
class StylesTest {
  @test 'output hashed classes'() {
    const Style = FreeStyle.create();
    let changeId = Style.changeId;

    const className = Style.registerStyle({
      color: 'red'
    });
    expect(Style.getStyles()).toBe(`.${className}{color:red}`);
    expect(Style.changeId).not.toBe(changeId);
  }
  @test 'multiple values'() {
    const Style = FreeStyle.create();
    const className = Style.registerStyle({
      background: [
        'red',
        'linear-gradient(to right, red 0%, green 100%)'
      ]
    });
    expect(Style.getStyles()).toBe(`.${className}{background:red;background:linear-gradient(to right, red 0%, green 100%)}`);
  }
  @test 'dash-case property names'() {
    const Style = FreeStyle.create();
    const className = Style.registerStyle({
      backgroundColor: 'red',
    });
    expect(Style.getStyles()).toBe(`.${className}{background-color:red}`);
  }
  @test 'nest @-rules'() {
    const Style = FreeStyle.create();
    const className = Style.registerStyle({
      color: 'red',
      '@media (min-width: 500px)': {
        color: 'blue'
      }
    });
    expect(Style.getStyles()).toBe(`.${className}{color:red}@media (min-width: 500px){.${className}{color:blue}}`);
  }
  @test 'interpolate selectors'() {
    const Style = FreeStyle.create();

    const className = Style.registerStyle({
      color: 'red',
      '& > &': {
        color: 'blue',
        '.class-name': {
          background: 'green'
        }
      }
    });

    expect(
      Style.getStyles()).toBe(
      `.${className}{color:red}.${className} > .${className}{color:blue}` +
      `.${className} > .${className} .class-name{background:green}`
    );

  }
  @test 'do not append "px" to whitelisted properties'() {
    const Style = FreeStyle.create();
    const className = Style.registerStyle({
      flexGrow: 2,
      WebkitFlexGrow: 2
    });
    expect(Style.getStyles()).toBe(`.${className}{-webkit-flex-grow:2;flex-grow:2}`);
  }
  @test 'merge duplicate styles'() {
    const Style = FreeStyle.create();
    let changeId = Style.changeId;

    const className1 = Style.registerStyle({
      background: 'blue',
      color: 'red'
    });

    expect(Style.changeId).not.toBe(changeId);

    // Checking the duplicate style _does not_ trigger a "change".
    changeId = Style.changeId;

    const className2 = Style.registerStyle({
      color: 'red',
      background: 'blue'
    });

    expect(Style.changeId).toBe(changeId);
    expect(className1).toBe(className2);
    expect(Style.getStyles()).toBe(`.${className1}{background:blue;color:red}`);

  }
  @test 'allow debug css prefixes'() {
    const Style = FreeStyle.create(undefined, true);
    let changeId = Style.changeId;

    const className1 = Style.registerStyle(
      {
        color: 'red'
      },
      'className1'
    );

    expect(Style.changeId).not.toBe(changeId);

    changeId = Style.changeId;

    const className2 = Style.registerStyle(
      {
        color: 'red'
      },
      'className2'
    );

    expect(Style.changeId).not.toBe(changeId);
    expect(className1).not.toBe(className2);

    expect(Style.getStyles()).toBe(`.${className1},.${className2}{color:red}`);

  }
  @test 'ignore debug prefixes in "production"'() {
    const Style = FreeStyle.create(undefined, false);
    let changeId = Style.changeId;

    const className1 = Style.registerStyle(
      {
        color: 'red'
      },
      'className1'
    );

    expect(Style.changeId).not.toBe(changeId);

    changeId = Style.changeId;

    const className2 = Style.registerStyle(
      {
        color: 'red'
      },
      'className2'
    );

    expect(Style.changeId).toBe(changeId);
    expect(className1).toBe(className2);
    expect(Style.getStyles()).toBe(`.${className1}{color:red}`);

  }
  @test 'sort keys by property name'() {
    const Style = FreeStyle.create();

    const className = Style.registerStyle({
      border: '5px solid red',
      borderWidth: 10,
      borderColor: 'blue'
    });

    expect(Style.getStyles()).toBe(`.${className}{border:5px solid red;border-color:blue;border-width:10px}`);

  }
  @test 'sort keys alphabetically after hyphenating'() {
    const Style = FreeStyle.create();

    const className = Style.registerStyle({
      borderRadius: 5,
      msBorderRadius: 5
    });

    expect(Style.getStyles()).toBe(`.${className}{-ms-border-radius:5px;border-radius:5px}`);

  }
  @test 'overloaded keys should sort in insertion order'() {
    const Style = FreeStyle.create();

    const className = Style.registerStyle({
      foo: [ 15, 13, 11, 9, 7, 5, 3, 1, 14, 12, 10, 8, 6, 4, 2 ]
    });

    expect(Style.getStyles()).toBe(`.${className}{foo:15px;foo:13px;foo:11px;foo:9px;foo:7px;foo:5px;foo:3px;foo:1px;foo:14px;foo:12px;foo:10px;foo:8px;foo:6px;foo:4px;foo:2px}`);

  }
  @test 'merge duplicate nested styles'() {
    const Style = FreeStyle.create();

    const className = Style.registerStyle({
      color: 'red',
      '.foo': {
        color: 'red'
      }
    });

    expect(
      Style.getStyles()).toBe(
      `.${className},.${className} .foo{color:red}`
    );

  }
  @test 'multiple nested styles'() {
    const Style = FreeStyle.create();
    Style.registerRule('button', {
      color: 'green',
      '&.foo,&.moo': {
        color: 'red',
        '&.one,&.two': {
          color: 'blue'
        }
      }
    });
    expect(Style.getStyles()).toBe(
      `button{color:green}` +
      `button.foo,button.moo{color:red}` +
      `button.foo.one,button.foo.two,button.moo.one,button.moo.two{color:blue}`
    );
  }
  @test 'merge @-rules'() {
    const Style = FreeStyle.create();
    const mediaQuery = '@media (min-width: 600px)';
    let changeId = Style.changeId;

    const className1 = Style.registerStyle({
      [ mediaQuery ]: {
        color: 'red'
      }
    });

    expect(Style.changeId).not.toBe(changeId);

    // Checking the next register _does_ trigger a change.
    changeId = Style.changeId;

    const className2 = Style.registerStyle({
      [ mediaQuery ]: {
        color: 'blue'
      }
    });

    expect(Style.changeId).not.toBe(changeId);

    expect(
      Style.getStyles()).toBe(
      `@media (min-width: 600px){.${className1}{color:red}.${className2}{color:blue}}`
    );

  }
  @test 'do not output empty styles'() {
    const Style = FreeStyle.create();

    Style.registerStyle({
      color: null
    });

    expect(Style.getStyles()).toBe('');

  }
  @test 'support @-rules within @-rules'() {
    const Style = FreeStyle.create();

    const className = Style.registerStyle({
      '@media (min-width: 100em)': {
        '@supports (display: flexbox)': {
          maxWidth: 100
        }
      }
    });

    expect(
      Style.getStyles()).toBe(
      `@media (min-width: 100em){@supports (display: flexbox){.${className}{max-width:100px}}}`
    );

  }
  @test 'merge duplicate styles across instances'() {
    const Style1 = FreeStyle.create();
    const Style2 = FreeStyle.create();
    const Style3 = FreeStyle.create();

    const className1 = Style1.registerStyle({
      color: 'red'
    });

    const className3 = Style3.registerStyle({
      color: 'red',
      '@media (max-width: 600px)': {
        color: 'blue'
      }
    });

    Style2.merge(Style3);
    Style1.merge(Style2);

    expect(
      Style1.getStyles()).toBe(
      `.${className1},.${className3}{color:red}@media (max-width: 600px){.${className3}{color:blue}}`
    );

    Style1.unmerge(Style2);

    expect(
      Style1.getStyles()).toBe(
      `.${className1}{color:red}`
    );

  }
  @test 'keyframes'() {
    const Style = FreeStyle.create();

    const keyframes = Style.registerKeyframes({
      from: { color: 'red' },
      to: { color: 'blue' }
    });

    expect(Style.getStyles()).toBe(`@keyframes ${keyframes}{from{color:red}to{color:blue}}`);

  }
  @test 'merge duplicate keyframes'() {
    const Style = FreeStyle.create();

    const keyframes1 = Style.registerKeyframes({
      from: { color: 'red' },
      to: { color: 'blue' }
    });

    const keyframes2 = Style.registerKeyframes({
      to: { color: 'blue' },
      from: { color: 'red' }
    });

    expect(keyframes1).toBe(keyframes2);
    expect(Style.getStyles()).toBe(`@keyframes ${keyframes1}{from{color:red}to{color:blue}}`);

  }
  @test 'register arbitrary at rule'() {
    const Style = FreeStyle.create();
    let changeId = Style.changeId;

    Style.registerRule('@font-face', {
      fontFamily: '"Bitstream Vera Serif Bold"',
      src: 'url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf")'
    });

    expect(Style.changeId).not.toBe(changeId);

    expect(
      Style.getStyles()).toBe(
      '@font-face{font-family:"Bitstream Vera Serif Bold";' +
      'src:url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf")}'
    );

  }
  @test 'does not merge arbitrary at rules with different styles'() {
    const Style = FreeStyle.create();

    Style.registerRule('@font-face', {
      fontFamily: '"Bitstream Vera Serif Bold"',
      src: 'url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf")'
    });

    Style.registerRule('@font-face', {
      fontFamily: '"MyWebFont"',
      src: 'url("myfont.woff2")'
    });

    expect(
      Style.getStyles()).toBe(
      '@font-face{font-family:"Bitstream Vera Serif Bold";' +
      'src:url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf")}' +
      '@font-face{font-family:"MyWebFont";src:url("myfont.woff2")}'
    );

  }
  @test 'register base rule'() {
    const Style = FreeStyle.create();

    Style.registerRule('body', {
      margin: 0,
      padding: 0
    });

    expect(Style.getStyles()).toBe('body{margin:0;padding:0}');

  }
  @test 'register at rule with nesting'() {
    const Style = FreeStyle.create();

    Style.registerRule('@media print', {
      body: {
        color: 'red'
      }
    });

    expect(Style.getStyles()).toBe('@media print{body{color:red}}');

  }
  @test 'de-dupe using custom rules'() {
    const Style = FreeStyle.create();
    let changeId = Style.changeId;

    const className1 = Style.registerStyle({
      color: 'red'
    });

    expect(Style.changeId).not.toBe(changeId);
    changeId = Style.changeId;

    Style.registerRule('.test', {
      color: 'red'
    });

    expect(Style.changeId).not.toBe(changeId);
    expect(Style.getStyles()).toBe(`.${className1},.test{color:red}`);

  }
  @test 'cache order by latest insertion'() {
    const Style = FreeStyle.create();

    const x = Style.registerStyle({
      background: 'red',
      '@media (min-width: 400px)': {
        background: 'yellow'
      }
    });

    const y = Style.registerStyle({
      background: 'palegreen',
      '@media (min-width: 400px)': {
        background: 'pink'
      }
    });

    expect(
      Style.getStyles()).toBe(
      `.${x}{background:red}.${y}{background:palegreen}` +
      `@media (min-width: 400px){.${x}{background:yellow}.${y}{background:pink}}`
    );

  }
  @test 'keep order of nested params'() {
    const Style = FreeStyle.create();
    let changeId = Style.changeId;

    const className = Style.registerStyle({
      width: '20rem',
      '@media screen and (min-width: 500px)': {
        width: 500
      },
      '@media screen and (min-width: 1000px)': {
        width: 1000
      }
    });

    expect(Style.changeId).not.toBe(changeId);

    expect(
      Style.getStyles()).toBe(
      `.${className}{width:20rem}@media screen and (min-width: 500px){.${className}{width:500px}}` +
      `@media screen and (min-width: 1000px){.${className}{width:1000px}}`
    );

  }
  @test 'should work with properties and nested styles in a single rule'() {
    const Style = FreeStyle.create();

    Style.registerRule('body', {
      height: '100%',
      a: {
        color: 'red'
      }
    });

    expect(Style.getStyles()).toBe('body{height:100%}body a{color:red}');

  }
  @test 'should interpolate recursively with a rule'() {
    const Style = FreeStyle.create();

    Style.registerRule('body', {
      height: '100%',
      a: {
        color: 'red'
      },
      '@print': {
        a: {
          color: 'blue'
        }
      }
    });

    expect(Style.getStyles()).toBe('body{height:100%}body a{color:red}@print{body a{color:blue}}');

  }
  @test 'customise hash algorithm'() {
    const Style = FreeStyle.create((str: string) => {
      return Crypto.createHash('sha256').update(str).digest('hex')
    });

    const className1 = Style.registerStyle({
      color: 'red'
    });

    const className2 = Style.registerStyle({
      color: 'blue'
    });

    const keyframes = Style.registerKeyframes({
      from: {
        color: 'red'
      },
      to: {
        color: 'blue'
      }
    });

    expect(className2.length).toBe(65);
    expect(className1.length).toBe(65);
    expect(keyframes.length).toBe(65);

    expect(
      Style.getStyles()).toBe(
      `.${className1}{color:red}.${className2}{color:blue}@keyframes ${keyframes}{from{color:red}to{color:blue}}`
    );

  }
  @test 'detect hash collisions'() {
    const Style = FreeStyle.create();
    const className = Style.registerStyle({ color: '#0008d0' });

    try {
      Style.registerStyle({ color: '#000f82' });
      expect.fail('Should throw colision error')
    } catch (e) {
      expect(e.message).toBe('Hash collision: .f1pqsan1{color:#000f82} === .f1pqsan1{color:#0008d0}')
    }
    expect(Style.getStyles()).toBe(`.${className}{color:#0008d0}`);
  }
  @test 'detect hash collision for nested styles'() {
    const Style = FreeStyle.create();
    try {
      Style.registerStyle({
        div: { color: '#0009e8' },
        span: { color: 'red' }
      });

      Style.registerStyle({
        div: { color: '#000f75' },
        span: { color: 'red' }
      });
      expect.fail('Should throw collision error')
    } catch (e) {
      expect(e.message.indexOf('Hash collision') == 0).toBe(true);
    }

  }
  @test 'detect hash collision for keyframes'() {
    const Style = FreeStyle.create();
    try {
      Style.registerKeyframes({
        from: { color: '#0008da' },
        to: { color: 'red' }
      });
      Style.registerKeyframes({
        from: { color: '#000f8c' },
        to: { color: 'red' }
      });
      expect.fail('Should throw collision error')
    } catch (e) {
      expect(e.message.indexOf('Hash collision') == 0).toBe(true);
    }
  }
  @test 'disable style deduping'() {
    const Style = FreeStyle.create();

    const className = Style.registerStyle({
      color: 'blue',
      '&::-webkit-input-placeholder': {
        color: `rgba(0, 0, 0, 0)`,
        [ FreeStyle.IS_UNIQUE ]: true
      },
      '&::-moz-placeholder': {
        color: `rgba(0, 0, 0, 0)`,
        [ FreeStyle.IS_UNIQUE ]: true
      },
      '&::-ms-input-placeholder': {
        color: `rgba(0, 0, 0, 0)`,
        [ FreeStyle.IS_UNIQUE ]: true
      }
    });

    expect(
      Style.getStyles()).toBe(
      `.${className}{color:blue}` +
      `.${className}::-webkit-input-placeholder{color:rgba(0, 0, 0, 0)}` +
      `.${className}::-moz-placeholder{color:rgba(0, 0, 0, 0)}` +
      `.${className}::-ms-input-placeholder{color:rgba(0, 0, 0, 0)}`
    );

  }
  @test 'register a css object'() {
    const Style = FreeStyle.create();

    Style.registerCss({
      'body': {
        color: 'red',
        '@print': {
          color: 'blue'
        }
      },
      h1: {
        color: 'red',
        '@print': {
          color: '#000',
          a: {
            color: 'blue'
          }
        }
      }
    });

    expect(Style.getStyles()).toBe('body,h1{color:red}@print{h1{color:#000}body,h1 a{color:blue}}');

  }
  @test 'registering a hashed rule'() {
    const Style = FreeStyle.create();

    const animation1 = Style.registerHashRule('@keyframes', {
      from: {
        color: 'blue'
      },
      to: {
        color: 'red'
      }
    });

    const animation2 = Style.registerHashRule('@-webkit-keyframes', {
      from: {
        color: 'blue'
      },
      to: {
        color: 'red'
      }
    });

    expect(animation1).toBe(animation2);
    expect(Style.getStyles()).toBe(`@keyframes ${animation1}{from{color:blue}to{color:red}}@-webkit-keyframes ${animation2}{from{color:blue}to{color:red}}`);

  }
  @test 'change events'() {
    const styles: string[] = [];

    const Style = FreeStyle.create(undefined, undefined, {
      add(style, index) {
        styles.splice(index, 0, style.getStyles())
      },
      change(style, oldIndex, newIndex) {
        styles.splice(oldIndex, 1);
        styles.splice(newIndex, 0, style.getStyles())
      },
      remove(_, index) {
        styles.splice(index, 1)
      }
    });

    Style.registerStyle({
      background: 'red',
      '@media (min-width: 400px)': {
        background: 'yellow'
      }
    });

    Style.registerStyle({
      background: 'palegreen',
      '@media (min-width: 400px)': {
        background: 'pink'
      }
    });

    expect(styles.join('')).toBe(Style.getStyles());

  }
  @test 'escape css selectors'() {
    const Style = FreeStyle.create();
    const displayName = 'Connect(App)';

    const animationName = Style.registerKeyframes(
      { from: { color: 'red' } },
      displayName
    );

    const className = Style.registerStyle(
      { animation: animationName, '.t': { color: 'red' } },
      displayName
    );

    expect(animationName.startsWith(displayName)).toBe(true);
    expect(className.startsWith(displayName)).toBe(true);
    expect(Style.getStyles()).toBe(
      `@keyframes ${FreeStyle.escape(animationName)}{from{color:red}}` +
      `.${FreeStyle.escape(className)}{animation:Connect(App)_ftl4afb}` +
      `.${FreeStyle.escape(className)} .t{color:red}`
    );
  }

}