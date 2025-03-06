import { Handle, NodeProps, Position } from '@xyflow/react';

import { INodeContent } from '@/components/canvas/types/types';

export function DomainNode(props: NodeProps) {
  const { data, sourcePosition } = props;
  const { label } = data as unknown as INodeContent;

  return (
    <div
      style={{
        backgroundColor: '#c63031',
        borderRadius: '10px',
        padding: '7px 22px',
        color: 'white',
        fontSize: '16px',
        lineHeight: '22px',
      }}
    >
      <Handle
        id='source1'
        type='source'
        position={sourcePosition || Position.Bottom}
        style={{ backgroundColor: '#c63031', borderColor: '#c63031' }}
      />
      {label}
    </div>
  );
}
