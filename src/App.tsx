import React, { useState } from 'react';
import './App.scss';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="app">
            <header className="app-header">
                <p>
                    <button type="button" onClick={() => setCount((item) => item + 1)}>
            count is: {count}
                    </button>
                </p>
            </header>
        </div>
    );
}

export default App;
