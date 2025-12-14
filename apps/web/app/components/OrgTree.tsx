'use client';

import { useState, useMemo } from 'react';
import { Employee, EmployeeNode } from '../types/employee';
import EmployeePhoto from './EmployeePhoto';
import EmployeeDetailModal from './EmployeeDetailModal';
import styles from './OrgTree.module.css';

interface OrgTreeProps {
  employees: Employee[];
}

function buildTree(employees: Employee[]): EmployeeNode[] {
  const employeeMap = new Map<number, EmployeeNode>();
  const roots: EmployeeNode[] = [];

  employees.forEach((emp) => {
    employeeMap.set(emp.id, { ...emp, children: [] });
  });

  employees.forEach((emp) => {
    const node = employeeMap.get(emp.id)!;
    if (emp.managerId === null) {
      roots.push(node);
    } else {
      const parent = employeeMap.get(emp.managerId);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }
  });

  return roots;
}

interface TreeNodeProps {
  node: EmployeeNode;
  level: number;
  expandedNodes: Set<number>;
  toggleNode: (id: number) => void;
  onSelectEmployee: (employee: Employee) => void;
}

function TreeNode({ node, level, expandedNodes, toggleNode, onSelectEmployee }: TreeNodeProps) {
  const isExpanded = expandedNodes.has(node.id);
  const hasChildren = node.children.length > 0;
  const paddingLeft = `${level * 16 + 8}px`;

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      toggleNode(node.id);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectEmployee(node);
  };

  return (
    <div className={styles.treeNode}>
      <div
        className={`${styles.treeNodeContent} ${level === 0 ? styles.treeNodeRoot : ''}`}
        style={{ paddingLeft }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        title="Clique duplo para ver detalhes"
      >
        <div className={`${styles.treeExpandIcon} ${isExpanded ? styles.treeExpandIconExpanded : styles.treeExpandIconCollapsed}`}>
          {hasChildren ? (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <div className={styles.treeLeafDot} />
          )}
        </div>

        <div className={styles.avatar}>
          <EmployeePhoto src={node.photoPath} alt={node.name} />
        </div>

        <div className={styles.treeNodeInfo}>
          <div className={styles.treeNodeNameRow}>
            <span className={styles.treeNodeName}>{node.name}</span>
            {level === 0 && <span className={styles.badgeCeo}>CEO</span>}
          </div>
          <div className={styles.treeNodeTitle}>{node.jobTitle}</div>
        </div>

        <span className={styles.badgeDepartment}>{node.department}</span>

        {hasChildren && (
          <span className={styles.badgeCount}>
            {node.children.length}{' '}
            <span className={styles.badgeCountText}>direto{node.children.length !== 1 ? 's' : ''}</span>
          </span>
        )}
      </div>

      {isExpanded && hasChildren && (
        <div className={styles.treeNodeChildren}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
              onSelectEmployee={onSelectEmployee}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrgTree({ employees }: OrgTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const departments = [...new Set(employees.map((e) => e.department))].sort();

  const tree = useMemo(() => buildTree(employees), [employees]);

  const toggleNode = (id: number) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allIds = new Set(employees.map((e) => e.id));
    setExpandedNodes(allIds);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  const filteredTree = useMemo(() => {
    const hasFilters = searchTerm || departmentFilter || typeFilter || statusFilter;
    if (!hasFilters) return tree;

    const searchLower = searchTerm.toLowerCase();

    function filterNode(node: EmployeeNode): EmployeeNode | null {
      const matchesSearch = !searchTerm ||
        node.name.toLowerCase().includes(searchLower) ||
        node.jobTitle.toLowerCase().includes(searchLower);
      const matchesDepartment = !departmentFilter || node.department === departmentFilter;
      const matchesType = !typeFilter || node.type === typeFilter;
      const matchesStatus = !statusFilter || node.status === statusFilter;

      const matchesSelf = matchesSearch && matchesDepartment && matchesType && matchesStatus;

      const filteredChildren = node.children
        .map(filterNode)
        .filter((n): n is EmployeeNode => n !== null);

      if (matchesSelf || filteredChildren.length > 0) {
        return { ...node, children: filteredChildren };
      }

      return null;
    }

    return tree
      .map(filterNode)
      .filter((n): n is EmployeeNode => n !== null);
  }, [tree, searchTerm, departmentFilter, typeFilter, statusFilter]);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.filterRow}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.inputField}
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className={styles.selectField}
          >
            <option value="">Departamento</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={styles.selectField}
          >
            <option value="">Tipo</option>
            <option value="Employee">Funcionário</option>
            <option value="Partner">Parceiro</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.selectField}
          >
            <option value="">Status</option>
            <option value="Active">Ativo</option>
            <option value="Inactive">Inativo</option>
          </select>
          <div className={styles.buttonGroup}>
            <button onClick={expandAll} className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>
              Expandir
            </button>
            <button onClick={collapseAll} className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}>
              Recolher
            </button>
          </div>
        </div>
      </div>

      <div className={styles.treeContent}>
        {filteredTree.length > 0 ? (
          filteredTree.map((root) => (
            <TreeNode
              key={root.id}
              node={root}
              level={0}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
              onSelectEmployee={setSelectedEmployee}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            {searchTerm ? 'Nenhum funcionário encontrado' : 'Nenhum dado disponível'}
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.textHighlight}>{employees.length}</span> funcionários no total
      </div>

      <EmployeeDetailModal
        employee={selectedEmployee}
        employees={employees}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
}
