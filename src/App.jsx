import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route
} from 'react-router-dom';

import styles from './App.css'

import TodoList from './demos/TodoList'
import ShoppingCart from './demos/ShoppingCart'

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className={styles.container}>
                    <h1 style={{width: "100%",textAlign:"center"}}>React Demo</h1>
                    <ul className={styles.navBox}>
                        <li><Link to='/TodoList' className={styles.nav}>TodoList</Link></li>   
                        <li><Link to='/ShoppingCart' className={styles.nav}>ShoppingCart</Link></li>   
                    </ul>
                    <Route path='/TodoList' component={TodoList} />  
                    <Route path='/ShoppingCart' component={ShoppingCart} />  
                </div>
            </Router>
        )
    }
}