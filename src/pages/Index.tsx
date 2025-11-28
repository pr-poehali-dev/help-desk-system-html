import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Ticket {
  id: string;
  title: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
}

const mockTickets: Ticket[] = [
  {
    id: 'TKT-1234',
    title: 'Не работает авторизация через email',
    status: 'new',
    priority: 'critical',
    category: 'Технические',
    assignee: 'Не назначен',
    createdAt: '2024-11-28 10:30',
    updatedAt: '2024-11-28 10:30',
  },
  {
    id: 'TKT-1235',
    title: 'Запрос на добавление новой функции экспорта',
    status: 'in_progress',
    priority: 'medium',
    category: 'Функционал',
    assignee: 'Анна Иванова',
    createdAt: '2024-11-27 14:20',
    updatedAt: '2024-11-28 09:15',
  },
  {
    id: 'TKT-1236',
    title: 'Медленная загрузка дашборда',
    status: 'in_progress',
    priority: 'high',
    category: 'Производительность',
    assignee: 'Дмитрий Петров',
    createdAt: '2024-11-27 11:45',
    updatedAt: '2024-11-28 08:00',
  },
  {
    id: 'TKT-1237',
    title: 'Вопрос по интеграции с API',
    status: 'resolved',
    priority: 'low',
    category: 'Консультация',
    assignee: 'Мария Сидорова',
    createdAt: '2024-11-26 16:00',
    updatedAt: '2024-11-27 10:30',
  },
  {
    id: 'TKT-1238',
    title: 'Ошибка при загрузке файлов больше 10MB',
    status: 'new',
    priority: 'high',
    category: 'Технические',
    assignee: 'Не назначен',
    createdAt: '2024-11-28 09:00',
    updatedAt: '2024-11-28 09:00',
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tickets' | 'analytics'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'in_progress':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'closed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default:
        return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'gradient-purple glow-purple text-white';
      case 'high':
        return 'gradient-orange glow-orange text-white';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'low':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'Новая';
      case 'in_progress':
        return 'В работе';
      case 'resolved':
        return 'Решена';
      case 'closed':
        return 'Закрыта';
      default:
        return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'Критический';
      case 'high':
        return 'Высокий';
      case 'medium':
        return 'Средний';
      case 'low':
        return 'Низкий';
      default:
        return priority;
    }
  };

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: mockTickets.length,
    new: mockTickets.filter((t) => t.status === 'new').length,
    inProgress: mockTickets.filter((t) => t.status === 'in_progress').length,
    resolved: mockTickets.filter((t) => t.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-border p-6 animate-slide-in z-50">
        <div className="mb-8">
          <h1 className="text-2xl font-bold gradient-purple bg-clip-text text-transparent">
            HelpDesk Pro
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Система управления заявками</p>
        </div>

        <nav className="space-y-2">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            className={`w-full justify-start ${
              activeTab === 'dashboard' ? 'gradient-purple glow-purple text-white' : ''
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Icon name="LayoutDashboard" size={20} className="mr-2" />
            Дашборд
          </Button>
          <Button
            variant={activeTab === 'tickets' ? 'default' : 'ghost'}
            className={`w-full justify-start ${
              activeTab === 'tickets' ? 'gradient-purple glow-purple text-white' : ''
            }`}
            onClick={() => setActiveTab('tickets')}
          >
            <Icon name="Ticket" size={20} className="mr-2" />
            Заявки
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            className={`w-full justify-start ${
              activeTab === 'analytics' ? 'gradient-purple glow-purple text-white' : ''
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            <Icon name="BarChart3" size={20} className="mr-2" />
            Аналитика
          </Button>
        </nav>
      </aside>

      <main className="ml-64 p-8">
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-8">Дашборд</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="glass p-6 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl gradient-purple glow-purple">
                    <Icon name="Inbox" size={24} className="text-white" />
                  </div>
                  <Badge className="gradient-purple text-white">Всего</Badge>
                </div>
                <div className="text-3xl font-bold mb-2">{stats.total}</div>
                <p className="text-sm text-muted-foreground">Всего заявок</p>
              </Card>

              <Card className="glass p-6 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl gradient-blue glow-blue">
                    <Icon name="AlertCircle" size={24} className="text-white" />
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Новые</Badge>
                </div>
                <div className="text-3xl font-bold mb-2">{stats.new}</div>
                <p className="text-sm text-muted-foreground">Новых заявок</p>
              </Card>

              <Card className="glass p-6 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl gradient-orange glow-orange">
                    <Icon name="Clock" size={24} className="text-white" />
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                    В работе
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-2">{stats.inProgress}</div>
                <p className="text-sm text-muted-foreground">В процессе</p>
              </Card>

              <Card className="glass p-6 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/50">
                    <Icon name="CheckCircle2" size={24} className="text-green-400" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                    Решено
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-2">{stats.resolved}</div>
                <p className="text-sm text-muted-foreground">Решенных заявок</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Icon name="TrendingUp" size={24} className="mr-2 text-primary" />
                  Активность за неделю
                </h3>
                <div className="space-y-4">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                    <div key={day} className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground w-8">{day}</span>
                      <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full gradient-purple rounded-full transition-all duration-500"
                          style={{ width: `${Math.random() * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold w-8">
                        {Math.floor(Math.random() * 50)}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Icon name="Users" size={24} className="mr-2 text-secondary" />
                  Топ исполнителей
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Анна Иванова', count: 24, avatar: '👩‍💼' },
                    { name: 'Дмитрий Петров', count: 19, avatar: '👨‍💻' },
                    { name: 'Мария Сидорова', count: 15, avatar: '👩‍💻' },
                    { name: 'Алексей Смирнов', count: 12, avatar: '👨‍💼' },
                  ].map((person, index) => (
                    <div key={person.name} className="flex items-center gap-4">
                      <div className="text-2xl">{person.avatar}</div>
                      <div className="flex-1">
                        <p className="font-semibold">{person.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {person.count} решенных заявок
                        </p>
                      </div>
                      <Badge
                        className={
                          index === 0
                            ? 'gradient-purple text-white'
                            : index === 1
                            ? 'gradient-orange text-white'
                            : 'bg-muted'
                        }
                      >
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Заявки</h2>
              <Button className="gradient-purple glow-purple text-white">
                <Icon name="Plus" size={20} className="mr-2" />
                Создать заявку
              </Button>
            </div>

            <Card className="glass p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Поиск по заявкам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="new">Новые</SelectItem>
                    <SelectItem value="in_progress">В работе</SelectItem>
                    <SelectItem value="resolved">Решенные</SelectItem>
                    <SelectItem value="closed">Закрытые</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Приоритет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все приоритеты</SelectItem>
                    <SelectItem value="critical">Критический</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="low">Низкий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            <div className="space-y-4">
              {filteredTickets.map((ticket, index) => (
                <Card
                  key={ticket.id}
                  className="glass p-6 hover:scale-[1.02] transition-transform cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold">{ticket.title}</h3>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {getPriorityLabel(ticket.priority)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{ticket.id}</p>
                    </div>
                    <Badge className={getStatusColor(ticket.status)}>
                      {getStatusLabel(ticket.status)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Категория</p>
                      <p className="font-semibold">{ticket.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Исполнитель</p>
                      <p className="font-semibold">{ticket.assignee}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Создана</p>
                      <p className="font-semibold">{ticket.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Обновлена</p>
                      <p className="font-semibold">{ticket.updatedAt}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-8">Аналитика</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Icon name="PieChart" size={24} className="mr-2 text-primary" />
                  Распределение по приоритетам
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Критический', value: 15, color: 'gradient-purple' },
                    { label: 'Высокий', value: 32, color: 'gradient-orange' },
                    { label: 'Средний', value: 41, color: 'bg-yellow-500' },
                    { label: 'Низкий', value: 12, color: 'bg-gray-500' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">{item.label}</span>
                        <span className="text-sm text-muted-foreground">{item.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Icon name="Activity" size={24} className="mr-2 text-secondary" />
                  Время решения заявок
                </h3>
                <div className="space-y-6">
                  <div className="text-center p-6 glass rounded-xl">
                    <div className="text-4xl font-bold gradient-purple bg-clip-text text-transparent mb-2">
                      2.4 часа
                    </div>
                    <p className="text-sm text-muted-foreground">Среднее время решения</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 glass rounded-xl">
                      <div className="text-2xl font-bold text-green-400 mb-1">45 мин</div>
                      <p className="text-xs text-muted-foreground">Самое быстрое</p>
                    </div>
                    <div className="text-center p-4 glass rounded-xl">
                      <div className="text-2xl font-bold text-orange-400 mb-1">8.2 ч</div>
                      <p className="text-xs text-muted-foreground">Самое долгое</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="glass p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Icon name="TrendingUp" size={24} className="mr-2 text-accent" />
                Тренды последних 30 дней
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 glass rounded-xl border-l-4 border-green-500">
                  <div className="flex items-center justify-center mb-2">
                    <Icon name="ArrowUp" size={20} className="text-green-400 mr-1" />
                    <span className="text-2xl font-bold text-green-400">+23%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Решенных заявок</p>
                </div>
                <div className="text-center p-6 glass rounded-xl border-l-4 border-orange-500">
                  <div className="flex items-center justify-center mb-2">
                    <Icon name="ArrowDown" size={20} className="text-orange-400 mr-1" />
                    <span className="text-2xl font-bold text-orange-400">-15%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Среднее время ответа</p>
                </div>
                <div className="text-center p-6 glass rounded-xl border-l-4 border-blue-500">
                  <div className="flex items-center justify-center mb-2">
                    <Icon name="ArrowUp" size={20} className="text-blue-400 mr-1" />
                    <span className="text-2xl font-bold text-blue-400">+8%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Новых заявок</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}