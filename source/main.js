import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initializeStore } from './store';
import { loadMovieData } from './store/movies';
import './main.css'; // Global styles

import Header from './components/Header';
import ResultList from './components/ResultList';

const store = initializeStore();
store.dispatch(loadMovieData());

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Header />
                    <ResultList />
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('App'));
