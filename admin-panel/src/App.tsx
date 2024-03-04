import React from 'react';
import { Alert, AlertTitle, AlertDescription } from './components/ui/alert';
import { Terminal } from 'lucide-react';

function App() {
  return (
    <div className="App">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>

    </div>
  );
}

export default App;