import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';

class Title extends Component {
    constructor(props){
        super(props);
        console.log(props);
        const {dispatch} = props
        this.dispatch = dispatch;
    }
    add = ()=>{
        this.dispatch({type:'add'});
        console.log(this.props);
    }
    sub = ()=>{
        this.dispatch({type:'sub'});
        console.log(this.props);
    }
    render(){
        return (
            <>
            <h1>{this.props.count}</h1>
            <button onClick={this.add}>Add</button>
            <button onClick={this.sub}>Sub</button>
            </>
        );
    }
}

let Test = connect(state=>{
    return {
        count: state
    };
})(Title);

function setCount(count=1,action){
    switch(action.type){
        case 'add': return count + 1;
        case 'sub': return count - 1;
        default: return count;
    }
}

let count = createStore(setCount);

ReactDOM.render(
    <Provider store={count}>
        <Test />
    </Provider>,
    document.getElementById('main')
);