export interface TaskProps {
  content: string;
  title: string;
  timestamp: string;
  updated_at: string;
  id: string;
}

export interface TaskRequest {
  content: string;
  title: string;
}
