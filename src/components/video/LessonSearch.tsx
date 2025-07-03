
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

interface LessonSearchProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  searchQuery: string;
  filters: FilterOptions;
}

export interface FilterOptions {
  completed: boolean;
  inProgress: boolean;
  notStarted: boolean;
  sortBy: 'title' | 'duration' | 'progress';
  sortOrder: 'asc' | 'desc';
}

const LessonSearch: React.FC<LessonSearchProps> = ({
  onSearch,
  onFilter,
  searchQuery,
  filters
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFilter({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilter({
      completed: true,
      inProgress: true,
      notStarted: true,
      sortBy: 'title',
      sortOrder: 'asc'
    });
  };

  return (
    <div className="flex gap-2 mb-4">
      <form onSubmit={handleSearch} className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search lessons..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="pl-10"
        />
      </form>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Status</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="completed"
                    checked={filters.completed}
                    onCheckedChange={(checked) => handleFilterChange('completed', checked)}
                  />
                  <label htmlFor="completed" className="text-sm">Completed</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inProgress"
                    checked={filters.inProgress}
                    onCheckedChange={(checked) => handleFilterChange('inProgress', checked)}
                  />
                  <label htmlFor="inProgress" className="text-sm">In Progress</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notStarted"
                    checked={filters.notStarted}
                    onCheckedChange={(checked) => handleFilterChange('notStarted', checked)}
                  />
                  <label htmlFor="notStarted" className="text-sm">Not Started</label>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Sort By</h4>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="title">Title</option>
                <option value="duration">Duration</option>
                <option value="progress">Progress</option>
              </select>
            </div>

            <div>
              <h4 className="font-medium mb-2">Order</h4>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LessonSearch;
