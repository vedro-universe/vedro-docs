import PluginCode from './PluginCode';
import PluginOrbs from './PluginOrbs';
import PluginStats from './PluginStats';

const PluginArchitecture = () => {
  return (
    <div>
      <PluginOrbs />
      <PluginStats />
      <PluginCode />
    </div>
  );
};

export default PluginArchitecture;
