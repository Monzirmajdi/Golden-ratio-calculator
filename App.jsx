import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Copy, Calculator, Check } from 'lucide-react'
import './App.css'

function App() {
  const [inputNumber, setInputNumber] = useState('')
  const [iterations, setIterations] = useState('')
  const [results, setResults] = useState([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [showCopyMessage, setShowCopyMessage] = useState(false)

  const goldenRatio = 1.618

  const calculateResults = () => {
    if (!inputNumber || !iterations) {
      alert('Please enter both a number and number of iterations')
      return
    }

    const num = parseFloat(inputNumber)
    const iter = parseInt(iterations)

    if (isNaN(num) || isNaN(iter) || iter <= 0) {
      alert('Please enter valid numbers')
      return
    }

    setIsCalculating(true)
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const newResults = []
      let currentValue = num

      for (let i = 1; i <= iter; i++) {
        currentValue = currentValue * goldenRatio
        newResults.push({
          iteration: i,
          value: currentValue,
          formatted: currentValue.toFixed(6)
        })
      }

      setResults(newResults)
      setIsCalculating(false)
    }, 300)
  }

  const copyToClipboard = (value, index) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedIndex(index)
      setShowCopyMessage(true)
      
      // إخفاء الرسالة بعد 2 ثانية
      setTimeout(() => {
        setCopiedIndex(null)
        setShowCopyMessage(false)
      }, 2000)
    }).catch(err => {
      console.error('Failed to copy:', err)
      alert('فشل في النسخ. يرجى المحاولة مرة أخرى.')
    })
  }

  const clearResults = () => {
    setResults([])
    setInputNumber('')
    setIterations('')
    setCopiedIndex(null)
    setShowCopyMessage(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Golden Ratio Calculator</h1>
          <p className="text-gray-600">Multiply your number by 1.618 (φ) multiple times</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Calculator
            </CardTitle>
            <CardDescription>
              Enter a number and specify how many times to multiply it by the golden ratio (1.618)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Starting Number</Label>
                <Input
                  id="number"
                  type="number"
                  placeholder="Enter a number"
                  value={inputNumber}
                  onChange={(e) => setInputNumber(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iterations">Number of Iterations</Label>
                <Input
                  id="iterations"
                  type="number"
                  placeholder="How many times?"
                  value={iterations}
                  onChange={(e) => setIterations(e.target.value)}
                  min="1"
                  className="text-lg"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={calculateResults} 
                disabled={isCalculating}
                className="flex-1"
              >
                {isCalculating ? 'Calculating...' : 'Calculate'}
              </Button>
              {results.length > 0 && (
                <Button variant="outline" onClick={clearResults}>
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>
                Each result can be copied individually by clicking the copy button
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showCopyMessage && (
                <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-center">
                  ✅ Copied to clipboard successfully!
                </div>
              )}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {results.map((result) => (
                  <div 
                    key={result.iteration}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex-1">
                      <span className="text-sm text-gray-500 mr-2">
                        Iteration {result.iteration}:
                      </span>
                      <span className="font-mono text-lg font-semibold">
                        {result.formatted}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(result.formatted, result.iteration)}
                      className="ml-2"
                    >
                      {copiedIndex === result.iteration ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Golden Ratio (φ):</strong> 1.618033988749... is a mathematical constant 
                  found throughout nature and art, representing the most aesthetically pleasing proportions.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default App

