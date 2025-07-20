import React from 'react'
import Sidebar from './Sidebar'
import ChatPanel from './ChatPanel'
import AnalyticsPanel from './AnalyticsPanel'

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-dark-primary to-dark-secondary overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex min-w-0">
        {/* Chat Interface */}
        <ChatPanel />

        {/* Analytics Dashboard */}
        <AnalyticsPanel />
      </div>
    </div>
  )
}

export default Dashboard