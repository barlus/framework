import * as React                                                          from "@barlus/react"
import {DocExample, DocNote, DocPage, DocSample, DocSection}               from "../../comps/DocPage";
import {Autocomplete, Avatar, Chip, MenuItem, Tile, TileContent, TileIcon} from "@barlus/spectre";


export class DocAutocomplete extends DocPage<any, any> {

  static title = "Autocomplete";
  static ready = true;
  static suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
  ];
  constructor(p, c) {
    super(p, c);
    this.state = {
      multipleValue: "",
      selected: [],
      options: [],
      searchableValue: "FA"
    }
  }

  componentDidMount() {
    this.updateOptions();
  }

  updateOptions() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => {
        this.setState({ options: data })
      })
      .catch(error => console.log(error))
  }

  handleAddition = (item) => {
    let { selected } = this.state;
    selected = [ ...selected ];
    selected.push(item);
    this.setState({ selected: selected, multipleValue: "", searchableValue: "" })
  };

  onMultipleChoiceChange = (e) => {
    this.setState({ multipleValue: e.target.value });
    console.log(e.target.value, "value can be used to run some server-side filtering")
    this.updateOptions()
  };

  handleDelete = (item) => {
    let { selected } = this.state;
    selected = [ ...selected ];
    let index = selected.indexOf(item);
    selected.splice(index, 1);
    this.setState({ selected })
  };

  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocNote>
        Autocomplete form component provides suggestions while you type. It is often used for tags
        and contacts input.
      </DocNote>
      <DocSample columns={12 / 10}>
        Simple autocomplete component
        <Autocomplete
          placeholder='Search a country (start with a)'
          renderItem={(item, index, active) => <MenuItem key={index} className={(active ? "bg-gray" : "")}><Tile
            centered><TileContent>{item.label}</TileContent></Tile></MenuItem>}
          filter={(item, query) => item.label.toLowerCase().includes(query.toLowerCase())}
          getItemValue={item => item.label}
          value={this.state.searchableValue}
          maxOptionsCount={3}
          onChange={e => this.setState({ searchableValue: e.target.value })}
          onSelectItem={value => this.setState({ searchableValue: value.label })}
          options={DocAutocomplete.suggestions}/>
      </DocSample>
      <DocExample lang="javascript" content={`
                export class Demo extends React.Component{

                    static  suggestions = [
                        { label: 'Afghanistan' },
                        { label: 'Aland Islands' }
                    ]
                    constructor(p,c){
                        super(p,c);
                        this.state={
                            searchableValue:"",
                        }
                    }

                    render() {
                        return (<Autocomplete
                            placeholder='Search a country (start with a)'
                            renderItem={(item,active)=><MenuItem className={ (active?"bg-gray":"")}><Tile centered><TileContent>{item.label}</TileContent></Tile></MenuItem>}
                            filter={ (item, query) => item.label.toLowerCase().includes(query.toLowerCase())}
                            getItemValue={item=>item.label}
                            value = {this.state.searchableValue}
                            maxOptionsCount = {3}
                            onChange={e => this.setState({ searchableValue: e.target.value })}
                            onSelect={value => this.setState({searchableValue: value.label })}
                            options={DocAutocomplete.suggestions}/>)
                   }
                }
            `}/>
      <DocSample columns={12 / 10}>
        Async data flow with multiple choice
        <Autocomplete
          multiple={true}
          renderSelectedItem={(item, index) => <Chip key={index}><Avatar sm initial={item.id}/>{item.name}</Chip>}
          placeholder='Select multiple users'
          value={this.state.multipleValue}
          renderItem={(item, index, active) => <MenuItem className={(active ? "bg-gray" : "")}><Tile
            centered><TileIcon><Avatar sm
                                       initial={item.id}/></TileIcon><TileContent>{item.name}</TileContent></Tile></MenuItem>}
          filter={(item, query) => item.name.toLowerCase().includes(query.toLowerCase())}
          getItemValue={item => item.name}
          onChange={this.onMultipleChoiceChange}
          maxOptionsCount={3}
          onDelete={this.handleDelete}
          onSelectItem={this.handleAddition}
          options={this.state.options}
          selected={this.state.selected}/>
      </DocSample>
      <DocExample lang="javascript" content={`
                export class Demo extends React.Component{
                    constructor(p,c){
                        super(p,c);
                        this.state={
                            selected : [],
                            options:[],
                            multipleValue:"",
                        }
                    }

                    componentDidMount(){
                        this.updateOptions();
                    }


                    updateOptions(){
                        fetch("https://jsonplaceholder.typicode.com/users")
                            .then(response=>response.json())
                            .then(data=>{
                                this.setState({options:data})
                            })
                            .catch(error=>console.log(error))
                    }

                    handleAddition = (item)=>{
                        let {selected} = this.state;
                        selected = [...selected];
                        selected.push(item);
                        this.setState({selected:selected,multipleValue:"",searchableValue:""})
                    };

                    onMultipleChoiceChange = (e)=>{
                        this.setState({multipleValue:e.target.value});
                        console.log(e.target.value , "value can be used to run some server-side filtering")
                        this.updateOptions()
                    };

                    handleDelete = (item)=>{
                        let {selected} = this.state;
                        selected = [...selected];
                        let index = selected.indexOf(item);
                        selected.splice(index,1);
                        this.setState({ selected })
                    };
                    render() {
                        return <Autocomplete
                            multiple={true}
                            renderSelectedItem={(item)=><Chip><Avatar sm initial={item.id}/>{item.name}</Chip>}
                            placeholder='Select multiple users'
                            value={this.state.multipleValue}
                            renderItem={(item,active)=><MenuItem className={ (active?"bg-gray":"")}><Tile centered><TileIcon><Avatar sm initial={item.id}/></TileIcon><TileContent>{item.name}</TileContent></Tile></MenuItem>}
                            filter={ (item, query) => item.name.toLowerCase().includes(query.toLowerCase())}
                            getItemValue={item=>item.name}
                            onChange={this.onMultipleChoiceChange}
                            maxOptionsCount = {3}
                            onDelete={this.handleDelete}
                            onSelect={this.handleAddition}
                            options={this.state.options}
                            selected={this.state.selected}/>
                   }
                }
            `}/>
      <DocNote>
        Add a container element with the <code>form-autocomplete</code> class. There are 2 parts of
        it, one is <code>form-autocomplete-input</code>, another is <code>menu</code> component. You
        may add the <code>is-focused</code> class to <code>form-autocomplete-input</code> to make it
        appear as focus state.<br/><br/>
        Spectre.css does NOT include JavaScript code, you will need to implement your JS to interact
        with the autocomplete. The autocomplete HTML structure is exampled below.
      </DocNote>

    </DocSection>
  }
}