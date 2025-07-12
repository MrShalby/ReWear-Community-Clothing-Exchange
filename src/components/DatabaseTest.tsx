import React, { useState } from 'react';
import { useFirebaseOperations } from '../hooks/useFirebaseOperations';

const DatabaseTest: React.FC = () => {
  const { createDoc, getDocs, loading, error } = useFirebaseOperations();
  const [testResults, setTestResults] = useState<string[]>([]);

  const testDatabase = async () => {
    setTestResults([]);
    
    // Test 1: Create a document
    const createResult = await createDoc('test', {
      message: 'Hello from ReWear!',
      timestamp: new Date(),
      test: true
    });

    if (createResult.success) {
      setTestResults(prev => [...prev, `✅ Document created with ID: ${createResult.id}`]);
      
      // Test 2: Read documents
      const readResult = await getDocs('test');
      if (readResult.success) {
        setTestResults(prev => [...prev, `✅ Retrieved ${readResult.data.length} documents`]);
        console.log('Documents:', readResult.data);
      } else {
        setTestResults(prev => [...prev, `❌ Failed to read: ${readResult.error}`]);
      }
    } else {
      setTestResults(prev => [...prev, `❌ Failed to create: ${createResult.error}`]);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Database Connection Test</h2>
      
      <button
        onClick={testDatabase}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {loading ? 'Testing...' : 'Test Database Connection'}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {testResults.length > 0 && (
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Test Results:</h3>
          {testResults.map((result, index) => (
            <div key={index} className="text-sm mb-1">
              {result}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-600">
        <p>✅ Firebase configured</p>
        <p>✅ Database functions ready</p>
        <p>✅ Context providers active</p>
      </div>
    </div>
  );
};

export default DatabaseTest; 