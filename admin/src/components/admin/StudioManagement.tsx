import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Search, Edit3, Trash2, MoreVertical, ImageIcon, Loader2 } from 'lucide-react';
import { useAdminStore, type StudioModel } from '../../store/adminStore';
import { StudioModelForm } from './StudioModelForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';

export const StudioManagement: React.FC = () => {
  const { studioModels, loading, fetchStudioModels, deleteStudioModel } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<StudioModel | undefined>(undefined);

  useEffect(() => {
    fetchStudioModels();
  }, [fetchStudioModels]);

  const filtered = studioModels.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.format.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (model: StudioModel) => {
    setEditingModel(model);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this 3D model?')) return;
    try {
      await deleteStudioModel(id);
      toast.success('Studio model deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingModel(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Search by name, category, format..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="gap-2" onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4" />
          Add 3D Model
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50 hover:bg-neutral-50 border-b border-neutral-100">
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-neutral-500">
                    No studio models. Add 3D models for the client Studio page.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((model) => (
                  <TableRow key={model.id} className="hover:bg-neutral-50/50 border-b border-neutral-100">
                    <TableCell>
                      <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden">
                        {model.image ? (
                          <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {model.name}
                      {model.featured && (
                        <Badge className="ml-2 bg-amber-100 text-amber-800 border-0 text-[10px]">Featured</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono">{model.format}</Badge>
                    </TableCell>
                    <TableCell className="text-neutral-600">{model.category}</TableCell>
                    <TableCell>${model.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(model)} className="gap-2">
                            <Edit3 className="w-4 h-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(model.id)} className="gap-2 text-red-600">
                            <Trash2 className="w-4 h-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <StudioModelForm isOpen={isFormOpen} onClose={handleCloseForm} model={editingModel} />
    </div>
  );
};
