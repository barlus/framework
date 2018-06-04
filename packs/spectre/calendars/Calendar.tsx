import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {Badge, Button, Navbar, NavbarSection, Tooltip} from "../index";

export class Calendar extends React.PureComponent<CalendarProps, CalendarState> {
    static defaultProps = {
        activeDate:new Date(),
        range : false,
        // minDate:new Date(2018, 4, 15),
        // maxDate:new Date(2018, 5, 24)
    };

    static monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    static weekdayNames = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ,"Sun"];

    constructor(props?: CalendarProps, context?: any){
        super(props,context);
        this.state = {
            activeDate : props.activeDate,
            selected : props.selected
        };
    };


    componentWillReceiveProps(nextProps:CalendarProps){

        if(nextProps.activeDate && nextProps.activeDate.getTime() != this.props.activeDate.getTime()){
            this.setState({
                activeDate:nextProps.activeDate
            })
        }
        if(nextProps.selected ){
            this.setState({
                selected:nextProps.selected
            })
        }

    };

    static daysInMonth (month:number, year:number):number {
        return new Date(year, month+1, 0).getDate();
    };

    static now = new Date();

    static nextMonthDate (activeDate:Date):Date {
        return new Date(activeDate.getFullYear(), activeDate.getMonth()+1,activeDate.getDate());
    };

    static previousMonthDate (activeDate:Date):Date {
        return new Date(activeDate.getFullYear(), activeDate.getMonth()-1,activeDate.getDate());
    };


    get activeMonth(){
        return Calendar.monthNames[this.state.activeDate.getMonth()]
    };

    get activeYear(){
        return this.state.activeDate.getFullYear()
    };

    get previousMonthDays(){
        let days=[];
        let neededDays;
        const firstDayIndex = new Date(this.state.activeDate.getFullYear(), this.state.activeDate.getMonth(), 1).getDay();
        const daysInPreviousMonth = Calendar.daysInMonth(this.state.activeDate.getMonth()-1,this.state.activeDate.getFullYear());
        neededDays = !firstDayIndex ? 6 : (firstDayIndex-1);
        console.log(daysInPreviousMonth);
        for(let i = daysInPreviousMonth;days.length < neededDays;i--){
            days.push(i);
        }
        return days.reverse();
    };

    get activeMonthDays(){
        let days = [];
        const daysInMonth = Calendar.daysInMonth(this.state.activeDate.getMonth(),this.state.activeDate.getFullYear());
        for(let i=1;i<=daysInMonth;i++){
            days.push(i);
        }
        return days;
    };

    get nextMonthDays(){
        let days = [];
        const daysInMonth = Calendar.daysInMonth(this.state.activeDate.getMonth(),this.state.activeDate.getFullYear());
        const lastDayIndex = new Date(this.state.activeDate.getFullYear(), this.state.activeDate.getMonth(), daysInMonth).getDay();
        if(lastDayIndex){
            for(let i=1;i<=(7-lastDayIndex);i++){
                days.push(i);
            }
        }
        return days;
    };

    isToday(activeDate:Date,date:number):boolean{
        const now = Calendar.now;
        return now.getFullYear() == activeDate.getFullYear()
            && now.getMonth() == activeDate.getMonth()
            && now.getDate() == date
    };

    rangeClasses(activeDate:Date,date:number):any{
        const selected = this.state.selected;
        let classes = [];
        if(!selected){
            return classes;
        }
        if(selected instanceof Date){
            return selected.getFullYear() == activeDate.getFullYear()
                && selected.getMonth() == activeDate.getMonth()
                && selected.getDate() == date
        }else{
            const rangeStart = selected.start;
            const rangeEnd = selected.end;
            if(rangeStart && rangeEnd && this.smallerThan(activeDate,date,rangeEnd,false) && this.greaterThan(activeDate,date,rangeStart,false)){
                classes.push(Theme.calendarRange);
            }
            if(rangeStart && this.theSameDay(activeDate,date,rangeStart)){
                classes.push(Theme.rangeStart);
            }
            if(rangeEnd && this.theSameDay(activeDate,date,rangeEnd)){
                classes.push(Theme.rangeEnd);
            }
        }
        return classes;

    }

    isSelectedDay(activeDate:Date,date:number):boolean{
        const selected = this.state.selected;
        if(!selected){return false}
        if(selected instanceof Date){
            return this.theSameDay(activeDate,date,selected);
        }else{
            const rangeStart = selected.start;
            const rangeEnd = selected.end;
            return (rangeStart && this.theSameDay(activeDate,date,rangeStart)) ||  ( rangeEnd && this.theSameDay(activeDate,date,rangeEnd))
        }
    };

    hasTooltip(activeDate:Date,date:number):string|null{
        let text = null;
        this.props.tooltips.forEach((t:string,d:Date)=>{
            if(this.theSameDay(activeDate,date,d)){
                text = t;
            }
        });
        return text;
    }
    hasEvent(activeDate:Date,date:number):null|any[]{
        let events = null;
        this.props.calendarEvents.forEach((t:any,d:Date)=>{
            if(this.theSameDay(activeDate,date,d)){
                events = t;
            }
        });
        return events;
    }

    smallerThan(a:Date,date:number,b:Date,strict = true):boolean{
        if(a.getFullYear() < b.getFullYear()){
            return true;
        }
        if(a.getMonth() < b.getMonth()  && a.getFullYear() == b.getFullYear()){
            return true;
        }
        if( (strict &&  date < b.getDate()) || (!strict && date <= b.getDate()) && a.getMonth() == b.getMonth()){
            return true;
        }
    }

    greaterThan(a:Date,date:number,b:Date,strict = true):boolean{
        if(a.getFullYear() > b.getFullYear()){
            return true;
        }
        if(a.getMonth() > b.getMonth() && a.getFullYear() == b.getFullYear()){
            return true;
        }
        if((strict &&  date > b.getDate()) || (!strict && date >= b.getDate())  && a.getMonth() == b.getMonth()){
            return true;
        }
    }

    theSameDay(a:Date,date:number,b:Date):boolean{
        return a.getFullYear() == b.getFullYear()
            && a.getMonth() == b.getMonth()
            && date == b.getDate()
    }

    isDisabledDay(activeDate:Date,date:number):boolean{
        const minDate = this.props.minDate;
        const maxDate = this.props.maxDate;
        if(minDate && this.smallerThan(activeDate,date,minDate)){
            return true;
        }
        if(maxDate && this.greaterThan(activeDate,date,maxDate)){
            return true;
        }
    };

    onPreviousClick = ()=>{
        let activeDate = Calendar.previousMonthDate(this.state.activeDate);
        this.setState({activeDate});
        this.props.onMonthChange && this.props.onMonthChange();
    };

    onNextClick = ()=>{
        let activeDate = Calendar.nextMonthDate(this.state.activeDate);
        this.setState({activeDate});
        this.props.onMonthChange && this.props.onMonthChange();
    };

    onDayClick = (day)=>{
        const date = new Date(this.state.activeDate.getFullYear(), this.state.activeDate.getMonth(),day);
        const range = this.props.range;
        if(range){
            const selected =this.state.selected;
            if(!selected || !selected['start']){
                this.setState({selected:{start:date}});
            }else{
                if(!selected['end']){

                    let start:Date = selected['start'];
                    let end :Date= date;
                    let s = {start,end};
                    if(this.greaterThan(start,start.getDate(),end,false)){
                        s = {start:end,end:start};
                    }
                    this.setState({selected:s});
                    this.props.onSelect && this.props.onSelect(s);
                }else{
                    this.setState({selected:{end:null,start:null}});
                }
            }
        }else{
            this.setState({selected:date});
            this.props.onSelect && this.props.onSelect(date);
        }

    };

    render() {
        const {
            className,
            large,
            activeDat,
            maxDate,
            minDate,
            range,
            onMonthChange,
            onSelect,
            selected,
            tooltips,
            // Styles.
            ...otherProps
        } = this.props;
        return <div {...otherProps} class={classes(Theme.calendar, className,large && Theme.calendarLg)}>
            <Navbar className={Theme.calendarNav}>
                <NavbarSection>
                    <Button action link large onClick={this.onPreviousClick}><i className="icon icon-arrow-left"/></Button>
                </NavbarSection>
                <NavbarSection center>
                    {this.activeMonth} {this.activeYear}
                </NavbarSection>
                <NavbarSection>
                    <Button action link large onClick={this.onNextClick}><i className="icon icon-arrow-right"/></Button>
                </NavbarSection>
            </Navbar>
            <div className={Theme.container}>
                <div className={Theme.calendarHeader}>
                    {Calendar.weekdayNames.map((day)=>(<div className={Theme.calendarDate}>{day}</div>))}
                </div>
                <div className={Theme.calendarBody}>
                    {this.previousMonthDays.map((day)=>(<div className={classes(Theme.calendarDate,Theme.prevMonth,Theme.disabled,range && this.rangeClasses(Calendar.previousMonthDate(this.state.activeDate),day))}>
                        <Button className={classes(Theme.dateItem,{
                            [Theme.dateToday]:this.isToday(Calendar.previousMonthDate(this.state.activeDate),day),
                            [Theme.active]:this.isSelectedDay(Calendar.previousMonthDate(this.state.activeDate),day)
                        })}>
                            {day.toString()}
                        </Button>
                    </div>))}
                    {this.activeMonthDays.map((day)=>{
                        let tooltipLabel = tooltips &&  this.hasTooltip(this.state.activeDate,day);
                        let events = large &&  this.hasEvent(this.state.activeDate,day);
                        let t = {'data-tooltip' : tooltipLabel};
                        let item = <div {...t} className={classes(Theme.calendarDate,Theme.currentMonth,range && this.rangeClasses(this.state.activeDate,day),tooltipLabel && "tooltip")}>
                            <Button onClick={()=>{this.onDayClick(day)}} data-badge="" className={classes(Theme.dateItem,tooltipLabel && "badge",{
                                [Theme.dateToday]:this.isToday(this.state.activeDate,day),
                                [Theme.active]:this.isSelectedDay(this.state.activeDate,day),
                                [Theme.disabled]:this.isDisabledDay(this.state.activeDate,day)
                            })}>
                                {day.toString()}
                            </Button>
                                {events && <div className={Theme.calendarEvents}>
                                    {
                                        events.map((event)=>(
                                            <div className={Theme.calendarEvent}>
                                                {event}
                                            </div>
                                        ))
                                    }
                                </div>}
                        </div>
                        return item;
                    })}
                    {this.nextMonthDays.map((day)=>(<div className={classes(Theme.calendarDate,Theme.nextMonth,Theme.disabled,range && this.rangeClasses(Calendar.nextMonthDate(this.state.activeDate),day))}>
                        <Button className={classes(Theme.dateItem,{
                            [Theme.dateToday]:this.isToday(Calendar.nextMonthDate(this.state.activeDate),day),
                            [Theme.active]:this.isSelectedDay(Calendar.nextMonthDate(this.state.activeDate),day)
                        })}>
                            {day.toString()}
                        </Button>
                    </div>))}
                </div>
            </div>
        </div>
    }
}

export interface CalendarProps {
    className?: string,
    activeDate?:Date
    large?:boolean
    maxDate?:Date,
    minDate?:Date,
    range?:boolean,
    onMonthChange?:Function,
    onSelect?:Function,
    selected?:Date|{start:Date,end:Date}
    tooltips?:Map<Date,string>,
    calendarEvents?:Map<Date,any[]>//todo change any to vnode

}
export interface CalendarState {
    activeDate?:Date
    selected?:Date|{start?:Date,end?:Date}
}