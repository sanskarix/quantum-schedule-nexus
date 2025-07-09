
import { useState } from 'react';

export const useAppData = () => {
  const [eventTypes, setEventTypes] = useState([{
    id: 1,
    title: 'Product Demo',
    slug: '/sanskar/product-demo',
    description: 'Witness innovation in action! Reserve a time for a personalized demo of our next-gen scheduler (THIS SITE)',
    durations: ['30m', '45m'],
    isActive: true,
    color: 'azure',
    icon: '⚡',
    bookingsToday: 3
  }, {
    id: 2,
    title: 'Interviews 🎬',
    slug: '/sanskar/interviews',
    description: "Let's chat about how your skills can be an asset for our team. No stress, just good vibes and great questions!",
    durations: ['30m', '60m'],
    isActive: true,
    color: 'pulse',
    icon: '👤',
    bookingsToday: 1
  }, {
    id: 3,
    title: 'Product Hunt Chats',
    slug: '/sanskar/product-hunt-chats',
    description: "The essence of Product Hunt reflects in communities- Select a time suitable for you, and let's talk products!",
    durations: ['15m', '30m', '45m', '60m'],
    isActive: true,
    color: 'amber',
    icon: '💬',
    bookingsToday: 5
  }, {
    id: 4,
    title: 'Everything Else',
    slug: '/sanskar/everything-else',
    description: "Open Agenda! Let's brainstorm over coffee or talk about your favorite singer. Whatever it is, I'm all ears! 🍵",
    durations: ['15m', '30m', '60m'],
    isActive: true,
    color: 'quantum',
    icon: '☕',
    bookingsToday: 2
  }, {
    id: 5,
    title: 'Technical Review',
    slug: '/sanskar/technical-review',
    description: "Deep dive into technical architecture and code review sessions for your projects.",
    durations: ['45m', '60m'],
    isActive: true,
    color: 'azure',
    icon: '⚙️',
    bookingsToday: 0
  }, {
    id: 6,
    title: 'Strategy Session',
    slug: '/sanskar/strategy-session',
    description: "Plan your roadmap and discuss strategic decisions for your business growth.",
    durations: ['30m', '60m', '90m'],
    isActive: true,
    color: 'pulse',
    icon: '📊',
    bookingsToday: 1
  }, {
    id: 7,
    title: 'Team Standup',
    slug: '/sanskar/team-standup',
    description: "Quick sync meetings to align team priorities and discuss blockers.",
    durations: ['15m', '30m'],
    isActive: true,
    color: 'quantum',
    icon: '🔄',
    bookingsToday: 4
  }, {
    id: 8,
    title: 'Client Onboarding',
    slug: '/sanskar/client-onboarding',
    description: "Welcome new clients and walk them through our processes and expectations.",
    durations: ['45m', '60m'],
    isActive: true,
    color: 'amber',
    icon: '🎯',
    bookingsToday: 2
  }, {
    id: 9,
    title: 'Design Review',
    slug: '/sanskar/design-review',
    description: "Collaborative design sessions to review mockups, prototypes and user experience.",
    durations: ['30m', '45m', '60m'],
    isActive: true,
    color: 'azure',
    icon: '🎨',
    bookingsToday: 1
  }]);

  const teams = [{
    id: 1,
    name: 'Design Team',
    slug: 'cal.id/design-team',
    logo: '🎨',
    color: 'amber',
    eventTypes: [{
      id: 101,
      title: 'Design Critique',
      description: 'Review and critique design work',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'amber',
      icon: '🎨',
      bookingsToday: 2
    }, {
      id: 102,
      title: 'User Research Session',
      description: 'Conduct user interviews and research',
      durations: ['60m'],
      isActive: true,
      color: 'azure',
      icon: '🔍',
      bookingsToday: 1
    }, {
      id: 103,
      title: 'Design System Review',
      description: 'Review and update design system components',
      durations: ['45m'],
      isActive: true,
      color: 'pulse',
      icon: '📐',
      bookingsToday: 0
    }, {
      id: 104,
      title: 'Portfolio Review',
      description: 'Review designer portfolios and work',
      durations: ['30m', '60m'],
      isActive: true,
      color: 'quantum',
      icon: '📁',
      bookingsToday: 3
    }, {
      id: 105,
      title: 'Brand Workshop',
      description: 'Collaborate on brand identity and guidelines',
      durations: ['90m'],
      isActive: true,
      color: 'amber',
      icon: '🎪',
      bookingsToday: 1
    }, {
      id: 106,
      title: 'Wireframe Session',
      description: 'Create and review wireframes together',
      durations: ['45m', '60m'],
      isActive: true,
      color: 'azure',
      icon: '📱',
      bookingsToday: 2
    }, {
      id: 107,
      title: 'Design Handoff',
      description: 'Hand off designs to development team',
      durations: ['30m'],
      isActive: true,
      color: 'pulse',
      icon: '🤝',
      bookingsToday: 1
    }]
  }, {
    id: 2,
    name: 'Engineering',
    slug: 'cal.id/engineering',
    logo: '⚙️',
    color: 'azure',
    eventTypes: [{
      id: 201,
      title: 'Code Review',
      description: 'Review pull requests and code quality',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'azure',
      icon: '👁️',
      bookingsToday: 4
    }, {
      id: 202,
      title: 'Technical Architecture',
      description: 'Discuss system architecture and design',
      durations: ['60m', '90m'],
      isActive: true,
      color: 'pulse',
      icon: '🏗️',
      bookingsToday: 2
    }, {
      id: 203,
      title: 'Bug Triage',
      description: 'Review and prioritize bugs and issues',
      durations: ['30m'],
      isActive: true,
      color: 'quantum',
      icon: '🐛',
      bookingsToday: 1
    }, {
      id: 204,
      title: 'Sprint Planning',
      description: 'Plan upcoming sprint and tasks',
      durations: ['60m'],
      isActive: true,
      color: 'amber',
      icon: '📋',
      bookingsToday: 0
    }, {
      id: 205,
      title: 'Technical Interview',
      description: 'Conduct technical interviews for candidates',
      durations: ['45m', '60m'],
      isActive: true,
      color: 'azure',
      icon: '💻',
      bookingsToday: 3
    }, {
      id: 206,
      title: 'Pair Programming',
      description: 'Collaborative coding session',
      durations: ['60m', '90m'],
      isActive: true,
      color: 'pulse',
      icon: '👥',
      bookingsToday: 2
    }, {
      id: 207,
      title: 'Tech Debt Review',
      description: 'Review and plan technical debt improvements',
      durations: ['45m'],
      isActive: true,
      color: 'quantum',
      icon: '🔧',
      bookingsToday: 1
    }]
  }, {
    id: 3,
    name: 'Marketing',
    slug: 'cal.id/marketing',
    logo: '📈',
    color: 'pulse',
    eventTypes: [{
      id: 301,
      title: 'Campaign Review',
      description: 'Review marketing campaign performance',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'pulse',
      icon: '📊',
      bookingsToday: 3
    }, {
      id: 302,
      title: 'Content Strategy',
      description: 'Plan content calendar and strategy',
      durations: ['60m'],
      isActive: true,
      color: 'amber',
      icon: '📝',
      bookingsToday: 2
    }, {
      id: 303,
      title: 'Brand Guidelines',
      description: 'Review and update brand guidelines',
      durations: ['45m'],
      isActive: true,
      color: 'azure',
      icon: '🎨',
      bookingsToday: 1
    }, {
      id: 304,
      title: 'Social Media Planning',
      description: 'Plan social media content and strategy',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'quantum',
      icon: '📱',
      bookingsToday: 4
    }, {
      id: 305,
      title: 'Analytics Review',
      description: 'Review marketing analytics and metrics',
      durations: ['30m'],
      isActive: true,
      color: 'pulse',
      icon: '📈',
      bookingsToday: 2
    }, {
      id: 306,
      title: 'Partnership Discussion',
      description: 'Discuss potential partnerships and collaborations',
      durations: ['45m', '60m'],
      isActive: true,
      color: 'amber',
      icon: '🤝',
      bookingsToday: 1
    }, {
      id: 307,
      title: 'PR Strategy',
      description: 'Plan public relations and media strategy',
      durations: ['60m'],
      isActive: true,
      color: 'azure',
      icon: '📢',
      bookingsToday: 0
    }]
  }, {
    id: 4,
    name: 'Sales',
    slug: 'cal.id/sales',
    logo: '💼',
    color: 'quantum',
    eventTypes: [{
      id: 401,
      title: 'Sales Demo',
      description: 'Product demonstration for prospects',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'quantum',
      icon: '💼',
      bookingsToday: 5
    }, {
      id: 402,
      title: 'Discovery Call',
      description: 'Initial discovery and needs assessment',
      durations: ['30m'],
      isActive: true,
      color: 'azure',
      icon: '🔍',
      bookingsToday: 3
    }, {
      id: 403,
      title: 'Proposal Review',
      description: 'Review sales proposals with prospects',
      durations: ['45m', '60m'],
      isActive: true,
      color: 'pulse',
      icon: '📋',
      bookingsToday: 2
    }, {
      id: 404,
      title: 'Contract Negotiation',
      description: 'Negotiate contract terms and pricing',
      durations: ['60m'],
      isActive: true,
      color: 'amber',
      icon: '⚖️',
      bookingsToday: 1
    }, {
      id: 405,
      title: 'Customer Check-in',
      description: 'Regular check-ins with existing customers',
      durations: ['15m', '30m'],
      isActive: true,
      color: 'quantum',
      icon: '✅',
      bookingsToday: 4
    }, {
      id: 406,
      title: 'Sales Training',
      description: 'Training sessions for sales team',
      durations: ['60m', '90m'],
      isActive: true,
      color: 'azure',
      icon: '🎓',
      bookingsToday: 1
    }, {
      id: 407,
      title: 'Pipeline Review',
      description: 'Review sales pipeline and opportunities',
      durations: ['45m'],
      isActive: true,
      color: 'pulse',
      icon: '📊',
      bookingsToday: 2
    }]
  }];

  const notifications = [
    {
      id: 1,
      type: 'reschedule',
      title: 'Meeting Rescheduled',
      message: 'Product Demo with John Doe has been moved to tomorrow 3:00 PM',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'cancellation', 
      title: 'Meeting Cancelled',
      message: 'Interview with Jane Smith has been cancelled',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'booking',
      title: 'New Booking',
      message: 'Strategy Session booked for Friday 2:00 PM',
      time: '3 hours ago',
      unread: false
    }
  ];

  return {
    eventTypes,
    setEventTypes,
    teams,
    notifications
  };
};
