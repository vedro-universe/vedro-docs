import PluginCode from './PluginCode';
import PluginOrbs from './PluginOrbs';
import PluginStats from './PluginStats';

const PluginArchitecture = () => {
  return (
    <div className="-mt-3">
      <PluginOrbs />
      <PluginStats />
      <PluginCode />
    </div>
  );
};

export default PluginArchitecture;
