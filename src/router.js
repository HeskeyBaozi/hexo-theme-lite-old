import React from 'react';
import {Router, Route, IndexRoute} from 'dva/router';
import App from './routes/App/App';

function RouterConfig({history}) {
    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={() => <div>Good Night~</div>}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
