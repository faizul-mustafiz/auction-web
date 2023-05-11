import { FC, memo } from 'react';

export interface ItemListProps {
  items: any[];
}

const ItemList: FC<ItemListProps> = (props: ItemListProps) => {
  const { items } = props;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Starting Price</th>
            <th>Time Window(hour)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.startingPrice}</td>
              <td>{item.duration}</td>
              <td>{item.status}</td>
              <td>
                <button>Bid</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const areEqual = (prevProps: ItemListProps, nextProps: ItemListProps) => {
  return prevProps.items === nextProps.items;
};

export default memo(ItemList, areEqual);
