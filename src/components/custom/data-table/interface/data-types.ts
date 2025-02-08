interface ActionProps<T = any> {
  name: string | ((data: T) => string); // Nom ou fonction retournant un nom dynamique
  title?: string; // Titre de l'action pour affichage (ex. Tooltip)
  handleClick: (data: T) => void; // Fonction exécutée lors du clic sur l'action
  isDisabled?: (data: T) => boolean; // Désactive l'action selon certaines conditions
  isShown?: boolean | ((data: T) => boolean); // Détermine si l'action doit être affichée
  isChecked?: (data: T) => boolean; // Indique si l'action a un état de sélection
}

interface PaginationProps {
  table: any;
  totalItems?: number;
  pageSize: number;
  currentPage?: number;
  lazy: boolean;
  onLazyLoad?: (index: number) => void;
}

export type { ActionProps, PaginationProps };
