import React from 'react';
import styles from './todo-list.css'

export default class TodoList extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			value:'',
			todoList: []
		}
		this.addItem = this.addItem.bind(this);
		this.submitItem = this.submitItem.bind(this);
		this.toggleItem = this.toggleItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	addItem(e) {
		this.setState({
			value: e.target.value
		})
	}

	submitItem(e) {

		if(!this.state.value.trim()) {
			alert("输入不能为空")
			return;
		}

		let newItem = {
			id: Math.random().toFixed(8)*100000000,
			done: false,
			text: this.state.value
		}
		this.setState(prevState=>{
			return {
				value: "",
				todoList: prevState.todoList.concat(newItem),
			}
		})
	}

	toggleItem(id) {
		let todoList = this.state.todoList.map((v,i)=>{
			if(v.id === id) {
				let done = !v.done
				return {...v,done};
			}
			return v;
		})
		this.setState({
			todoList
		})
	}

	deleteItem(id) {
		let todoList = this.state.todoList.filter((v,i)=>{
			if(v.id === id) {
				return false;
			}
			return true;
		})
		this.setState({
			todoList
		})
	}

	render() {
		console.log(`todoList:`,this.state.todoList)
		return (
			<div className={styles.tdlBox}>
				<AddItem 
				onAddItem={this.addItem} 
				value={this.state.value} 
				onSubmitItem={this.submitItem}/>
				<div>
					<ItemList 
					todoList={this.state.todoList}
					toggleItem={this.toggleItem}
					deleteItem={this.deleteItem}
					/> 
				</div>
			</div>
		);
	}
	

}

const AddItem = ({onAddItem,value,onSubmitItem}) => (
	<div>
		<input value={value} onChange={onAddItem}/>
		<input type="button" value={"submit"} onClick={onSubmitItem}/>
	</div>
)

class ItemList extends React.Component {
	constructor(props) {
		super(props);
		console.log(`ItemList`,props.todoList)
		this.state = {
			visibleList: []
		};
		this.filterList = this.filterList.bind(this);
	}

	componentWillReceiveProps(nextprops) {
		this.setState({
			visibleList: nextprops.todoList
		})
	}

	toggleItem(id) {
		let visibleList = this.state.visibleList.map((v,i)=>{
			if(v.id === id) {
				let done = !v.done
				return {...v,done};
			}
			return v;
		})
		this.setState({
			visibleList
		})
	}

	deleteItem(id) {
		let visibleList = this.state.visibleList.filter((v,i)=>{
			if(v.id === id) {
				return false;
			}
			return true;
		})
		this.setState({
			visibleList
		})
	}

	filterList(action) {
		if(action === 1){
			let visibleList = this.props.todoList.filter((v,i)=>(v.done));
			this.setState({
				visibleList
			});
		} else if ( action === 0 ) {
			let visibleList = this.props.todoList.filter((v,i)=>(!v.done));
			this.setState({
				visibleList
			});
		} else {
			this.setState({
				visibleList: this.props.todoList
			});
		}
	}

	render() {
		console.log(`ItemList render`)
		return (
		<div>
			{this.state.visibleList.map((v,i)=>(
				<Item  item={v} 
				onToggleItem={()=>this.props.toggleItem(v.id)}
				onDeleteItem={()=>this.props.deleteItem(v.id)}
				key={i}
				/>
			))}
			<input type="button" onClick={()=>{this.filterList("all")}} value="all"/>
			<input type="button" onClick={()=>{this.filterList(1)}} value="completed"/>
			<input type="button" onClick={()=>{this.filterList(0)}} value="uncompleted"/>
		</div>
		);
	}
}

const Item = ({item,onToggleItem,onDeleteItem}) => (
	<div>
		<p style={{textDecoration: item.done? "line-through":"",color: item.done?"#999":"#000"}} 
			onClick={onToggleItem} >{item.text}</p>
		<input style={{}} type="button" 
			onClick={onDeleteItem} value="delete" />
	</div>
)
