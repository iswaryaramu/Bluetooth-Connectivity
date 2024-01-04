// CombinedViewModel.js
import useBluetoothViewModel from './BluetoothViewModel';
import useApiViewModel from './ApiViewModel';

const CombinedViewModel = () => {
  const bluetoothViewModel = useBluetoothViewModel();
  const apiViewModel = useApiViewModel();

  return { bluetoothViewModel, apiViewModel };
};

export default CombinedViewModel;
