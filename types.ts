
export enum BillStatus {
  PAID = 'Paid',
  OVERDUE = 'Overdue',
  DUE = 'Due'
}

export enum ComplaintStatus {
  RESOLVED = 'Resolved',
  IN_PROGRESS = 'In Progress',
  NEW = 'New'
}

export enum VisitorStatus {
  EXITED = 'Exited',
  INSIDE = 'Inside',
  UPCOMING = 'Upcoming'
}

export interface Bill {
  id: string;
  type: string;
  billId: string;
  dueDate: string;
  amount: number;
  status: BillStatus;
}

export interface Visitor {
  id: string;
  name: string;
  flatNo: string;
  entryTime: string;
  exitTime: string;
  purpose: string;
  status: VisitorStatus;
  vehicleNumber?: string;
  qrCode?: string;
}

export interface Complaint {
  id: string;
  category: string;
  date: string;
  status: ComplaintStatus;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  content: string;
  isMe: boolean;
  reactions?: { emoji: string; count: number }[];
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'public' | 'private';
  unreadCount?: number;
}