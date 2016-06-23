import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initializeStore } from './store';
import { loadMovieData } from './store/movies';

import Filter from './components/Filter';
import ResultList from './components/ResultList';

const store = initializeStore();
store.dispatch(loadMovieData());

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Filter />
                    <ResultList />
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('App'));
