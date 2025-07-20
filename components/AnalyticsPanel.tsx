import React from 'react'
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  DocumentTextIcon,
  ClockIcon,
  StarIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ComponentType<any>
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon: Icon }) => (
  <div className="glass-card p-4 hover:scale-105 transition-transform duration-200">
    <div className="flex items-center justify-between mb-3">
      <div className="p-2 bg-gradient-to-br from-purple-primary/20 to-blue-accent/20 rounded-lg">
        <Icon className="w-5 h-5 text-purple-primary" />
      </div>
      <div className={`flex items-center text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        <ArrowTrendingUpIcon className={`w-3 h-3 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
        {change}
      </div>
    </div>
    <div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{title}</p>
    </div>
  </div>
)

const AnalyticsPanel: React.FC = () => {
  const metrics = [
    {
      title: 'Prompts Analyzed',
      value: '1,247',
      change: '+12%',
      trend: 'up' as const,
      icon: ChartBarIcon
    },
    {
      title: 'Avg. Effectiveness',
      value: '87%',
      change: '+5%',
      trend: 'up' as const,
      icon: StarIcon
    },
    {
      title: 'Templates Used',
      value: '34',
      change: '+8%',
      trend: 'up' as const,
      icon: DocumentTextIcon
    },
    {
      title: 'Time Saved',
      value: '24h',
      change: '+15%',
      trend: 'up' as const,
      icon: ClockIcon
    }
  ]

  const recentTemplates = [
    { name: 'Blog Post Generator', usage: 89, category: 'Writing' },
    { name: 'Code Documentation', usage: 76, category: 'Development' },
    { name: 'Email Marketing', usage: 65, category: 'Marketing' },
    { name: 'Social Media Post', usage: 54, category: 'Social' },
    { name: 'Product Description', usage: 43, category: 'E-commerce' }
  ]

  const activityData = [
    { day: 'Mon', prompts: 45 },
    { day: 'Tue', prompts: 52 },
    { day: 'Wed', prompts: 38 },
    { day: 'Thu', prompts: 61 },
    { day: 'Fri', prompts: 55 },
    { day: 'Sat', prompts: 29 },
    { day: 'Sun', prompts: 34 }
  ]

  return (
    <div className="w-80 bg-dark-secondary/30 backdrop-blur-sm border-l border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-lg font-bold text-white mb-1">Analytics</h2>
        <p className="text-sm text-gray-400">Your prompt performance insights</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Success Rate Chart */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Success Rate</h3>
            <span className="text-xs text-gray-400">Last 7 days</span>
          </div>

          {/* Circular Progress */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${87 * 2.51} 251`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6c5ce7" />
                    <stop offset="100%" stopColor="#74b9ff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">87%</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400">Average effectiveness score</p>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Weekly Activity</h3>
            <span className="text-xs text-gray-400">Prompts analyzed</span>
          </div>

          <div className="space-y-3">
            {activityData.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between">
                <span className="text-xs text-gray-400 w-8">{day.day}</span>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-primary to-blue-accent h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(day.prompts / 70) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-white w-6 text-right">{day.prompts}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Templates */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Popular Templates</h3>
            <button className="text-xs text-purple-primary hover:text-purple-secondary">View All</button>
          </div>

          <div className="space-y-3">
            {recentTemplates.map((template, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{template.name}</p>
                  <p className="text-xs text-gray-400">{template.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{template.usage}</p>
                  <p className="text-xs text-gray-400">uses</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Activity */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Team Activity</h3>
            <UsersIcon className="w-4 h-4 text-gray-400" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-primary to-blue-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">John Doe</p>
                <p className="text-xs text-gray-400">Created 5 templates</p>
              </div>
              <span className="text-xs text-gray-400">2h ago</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-accent to-purple-secondary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">SM</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">Sarah Miller</p>
                <p className="text-xs text-gray-400">Analyzed 12 prompts</p>
              </div>
              <span className="text-xs text-gray-400">4h ago</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-secondary to-purple-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">MJ</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">Mike Johnson</p>
                <p className="text-xs text-gray-400">Shared template library</p>
              </div>
              <span className="text-xs text-gray-400">1d ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPanel