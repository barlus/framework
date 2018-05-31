import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { Theme as FormTheme} from '../forms/theme';

import { classes } from '../utils/classes';
import {Chip, Input, Menu, MenuItem} from "../index";

export class Autocomplete extends React.PureComponent<AutocompleteProps, AutocompleteState> {


    static defaultProps = {
        getItemValue:(item)=>item,
        renderMenu:(items) => <Menu>{items}</Menu>,
        renderItem:(item,highlighted) => <MenuItem className={classes(highlighted?"bg-primary":"")}>{item}</MenuItem>,
        renderSelectedItem:(item) => <Chip>{item}</Chip>,
        filter:(item, query) => item.toLowerCase().includes(query.toLowerCase()),
        sort: () => {},
    };


    static debounce(fn, time)  {
        let timeout;
        return function() {
            const functionCall = () => fn.apply(this, arguments);
            clearTimeout(timeout);
            timeout = setTimeout(functionCall, time);
        }
    }

    constructor(p,c){
        super(p,c);
        this.state = {
            open : false,
            highlighted:-1
        };
        console.log("Autocomplete",this,React)
    }

    get inputDom(){
        return React.findDOMNode(this.refs['input'])
    }

    get inputValue(){
        return this.inputDom && this.inputDom.value
    }

    set inputValue(value){
        if(this.inputDom){
            this.inputDom.value = value
        }
    }

    get items() {
        const { options, filter, sort, maxOptionsCount,getItemValue ,multiple,value} = this.props;
        return options
            .filter(item => {
                if(!multiple){
                    return true
                }
                const itemValue = getItemValue(item);
                let selected = false;
                for (let i of this.props.selected){
                    if(getItemValue(i) == itemValue){
                        selected = true;
                        break;
                    }
                }
                return !selected;
            })
            .filter(item => filter(item, value||""))
            .sort(sort)
            .slice(0, maxOptionsCount)
    }

    renderSelected(){
        return this.props.selected.map((item)=>this.props.renderSelectedItem(item))
    }

    renderMenu(){
        const items = this.items;
        if(!items.length)return;
        const renderedItems = items.map((item,index)=>{
            const highlighted = this.state.highlighted == index;
            return React.cloneElement(this.props.renderItem(item,highlighted), {
                key:index,
                onMouseDown: this.handleSelectItem(item),
                onMouseEnter: this.handleMouseEnter(index),
            })

        });
        const renderedMenu = this.props.renderMenu(renderedItems);

        return renderedMenu;
    }


    // componentWillReceiveProps(nextProps) {
    //     console.log(this.props,"componentWillReceiveProps",nextProps);
    //     if (this.props.value != nextProps.value ) {
    //
    //         this.forceUpdate();
    //     }
    // }

    handleMouseEnter = index => event => {
        this.setState({highlighted: index})
    };

    handleFocus = (event) =>{
        const { onFocus } = this.props;
        this.setState({open:true});
        onFocus && onFocus(event);
    };

    handleBlur = (event) => {
        const { onBlur } = this.props;
        this.setState({open:false});
        onBlur && onBlur(event)
    };

    handleKeyDown = (event) =>{
        const { onKeyDown ,value} = this.props;
        const { highlighted } = this.state;
        onKeyDown && onKeyDown(event);
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault()
                const next = Math.min(highlighted + 1, this.items.length - 1)
                this.setState({ highlighted: next })
                return

            case 'ArrowUp':
                event.preventDefault()
                const prev = Math.max(highlighted - 1, -1)
                this.setState({ highlighted: prev })
                return

            case 'Enter':
                event.preventDefault()
                if (highlighted > -1) {
                    this.handleSelectItem(this.items[highlighted])(event)
                }
                return

            case 'Escape':
                this.setState({open:false})
                this.inputDom.blur();
                return
            case 'Backspace':
                (this.props.multiple && value.length == 0) && this.handleDeSelectItem(this.props.selected[this.props.selected.length-1])
                return;

        }

    };

    handleOnChange = (event)=>{
        const {onChange} = this.props;
        onChange && onChange(event,event.target.value);

    };

    handleSelectItem = item => event => {
        console.log("handleSelectItem");
        this.setState({
            highlighted:-1,
        });
        this.props.onSelect(item);

        setTimeout(() => {
            this.inputDom.focus();
            this.inputDom._blur = true
        })
    };

    handleDeSelectItem = item => {
        this.props.onDelete(item);
        setTimeout(() => {
            this.inputDom.focus()
            this.inputDom._blur = true
        })
    };

    render() {
        const {
            className,
            children,
            options,
            renderMenu,
            renderItem,
            renderSelectedItem,
            multiple,
            maxOptionsCount,
            placeholder,
            filter,
            sort,
            selected,
            onSelect,
            onDelete,
            value,
            ...otherProps
        } = this.props;
        return <div class={classes(Theme.Autocomplete,className)} {...otherProps}>
            <div class={classes(Theme.autocompleteInput,FormTheme.input,{[Theme.focused]:this.state.open})}>
                {multiple && this.renderSelected()}
                <Input ref={("input") as any} value={value} placeholder={placeholder} onChange={this.handleOnChange} onKeyDown={this.handleKeyDown} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
            </div>
            {this.state.open && this.renderMenu()}
        </div>
    }
}
export interface AutocompleteState{
    open?:boolean,
    highlighted?:number,
    query?:string
}

export type AutocompleteProps = MultipleProps | SearchableProps;
interface Common{
    value:string,
    className?: string,
    options:any[],
    onSelect:Function,
    getItemValue?:Function,
    placeholder?:string,
    renderMenu?:Function,
    renderItem?:Function,
    filter?:(option, query) => boolean,
    sort?:(a, b) => number,
}
interface SearchableProps extends Common{
    multiple?:false,
}

interface MultipleProps extends Common{
    multiple:true,
    selected:any[],
    onDelete:Function,
    renderSelectedItem?:Function,

}