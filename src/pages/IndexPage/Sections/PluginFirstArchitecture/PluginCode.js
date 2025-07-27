import CodeHighlighter from '../../Utils/CodeHighlighter';

const PluginCode = () => {
  const code = `
from vedro.core import Dispatcher, Plugin
from vedro.events import CleanupEvent

class SlackNotifierPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher):
        dispatcher.listen(CleanupEvent, self.on_cleanup)

    def on_cleanup(self, event: CleanupEvent):
        if event.report.failed > 0:
            notify_slack(f"❌ {event.report.failed} tests failed!")
`.trim();

  return (
    <div>
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Build Your Own in Minutes
        </h3>
        <p className="text-lg text-gray-600">
          Hook into any test lifecycle event with a simple API
        </p>
      </div>
      
      <div className="rounded-xl overflow-hidden shadow-lg max-w-3xl mx-auto">
        <CodeHighlighter code={code} className='!p-6' />
      </div>
    </div>
  );
};

export default PluginCode;
