import React from 'react'
import './App.css'
import './ListItems.js'
import ListItems from './ListItems.js'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.handleInput=this.handleInput.bind(this)
    this.addItem=this.addItem.bind(this)
    this.deleteItem=this.deleteItem.bind(this)
    this.setUpdate=this.setUpdate.bind(this)



  }
  handleInput(event){
    this.setState({
      currentItem:{
        text:event.target.value,
        key:Date.now()
      }
    })
  }
  addItem(event){
    event.preventDefault();
    const newItem=this.state.currentItem
    if(newItem.text!=""){
      const newItems=[...this.state.items,newItem]
      this.setState({
        items:newItems,
        currentItem:{
          text:"",
          key:""
        } 
      })
    }
  }
  deleteItem(key){
    const filteredItems=this.state.items.filter(item =>item.key!=key)
    console.log(filteredItems)
    this.setState({
      items:filteredItems
    })
  }
  setUpdate(text,key){
    const items=this.state.items 
    items.map(item=>{
      if(item.key===key){
        item.text=text
      }
    })
    this.setState({
      items:items
    })
  }
  render(){
    return (
      <div className="App">
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input type="text" value={this.state.currentItem.text} placeholder="Enter Text" onChange={this.handleInput}/>
            <button type="submit">Add</button>
          </form>
        </header>
        <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}></ListItems>
      </div>
    );
  }
}

export default App;
