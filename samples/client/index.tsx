import '@barlus/runtime';
import {React, Component} from '@barlus/bui';
import {Button} from './mdc/Button';
import { TopAppBar, TopAppBarIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from './mdc/AppBar';

class App extends Component<{}> {
    render() {
        return <TopAppBar>
            <TopAppBarRow>
                <TopAppBarSection align-start>
                    <TopAppBarIcon navigation>menu</TopAppBarIcon>
                    <TopAppBarTitle>My App</TopAppBarTitle>
                </TopAppBarSection>
                <TopAppBarSection align-end>
                    <TopAppBarIcon>more_vert</TopAppBarIcon>
                </TopAppBarSection>
            </TopAppBarRow>
        </TopAppBar>
        //  <TopAppBar>
        //     <Button><Button.Icon>favorite_border</Button.Icon>Hello</Button>
        // </TopAppBar>
    }
}

React.render(<App/>, document.body);