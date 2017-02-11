import dva from 'dva';
import createLoading from 'dva-loading';
import './index.html';
import './index.css';
import 'nprogress/nprogress.css';
import './config/nprogress.css';


// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading({
    effects: true
}));

// 3. Model
app.model(require("./models/app"));
app.model(require("./models/categories"));
app.model(require("./models/tags"));
app.model(require("./models/post_detail"));
app.model(require("./models/posts"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
