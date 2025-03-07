import { Handle, NodeProps } from '@xyflow/react';

import { INodeContent } from '@/components/canvas/types/types';

export function FollowUpNode(props: NodeProps) {
  const { data, targetPosition, selected } = props;

  const { label } = data as unknown as INodeContent;

  return (
    <div
      style={{
        backgroundColor: selected ? '#4A4A4A' : '#767676',
        borderRadius: '10px',
        padding: '7px 22px',
        color: 'white',
        fontSize: '16px',
        lineHeight: '22px',
      }}
    >
      {targetPosition && (
        <Handle
          type='target'
          position={targetPosition}
          style={{ backgroundColor: '#767676', borderColor: '#767676' }}
        />
      )}
      <div
        style={{
          maxWidth: '300px',
        }}
      >
        {label}
      </div>
    </div>
  );
}
