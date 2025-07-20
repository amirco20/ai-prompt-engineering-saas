import React, { useState } from 'react'
import { 
  HomeIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon, 
  BeakerIcon, 
  UsersIcon, 
  CogIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

interface SidebarItem {
  id: string
  name: string
  icon: React.ComponentType<any>
  active?: boolean
}

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('chat')

  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'chat', name: 'AI Assistant', icon: ChatBubbleLeftRightIcon, active: true },
    { id: 'templates', name: 'Templates', icon: DocumentTextIcon },
    { id: 'playground', name: 'Test Playground', icon: BeakerIcon },
    { id: 'team', name: 'Team', icon: UsersIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon },
  ]

  return (
    <div className="w-64 bg-dark-primary/50 backdrop-blur-xl border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-primary to-purple-secondary rounded-lg flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">PromptCraft</h1>
            <p className="text-xs text-gray-400">AI Prompt Engineering</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`sidebar-item w-full text-left ${isActive ? 'active' : ''}`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="glass-card p-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-accent to-purple-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-gray-400">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar