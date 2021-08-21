const { toast } = require('tailwind-toast');

const notify = (message, type = 'default', duration = 8000) => {
  const params = {
    shape: 'square',
    duration,
    speed: 800,
    positionX: 'center',
    positionY: 'top',
    fontTone: 200,
    color: 'bg-gray-500',
    fontColor: 'indigo',
  };
  switch (type) {
    case 'danger':
      params.color = 'bg-red-500';
      return toast().danger('Error:', message).with(params).show();
    case 'warning':
      params.color = 'bg-yellow-500';
      return toast().warning('Warn:', message).with(params).show();
    case 'success':
      params.color = 'bg-green-500';
      return toast().success(type, message).with(params).show();
    default:
      return toast().default('Success', message).with(params).show();
  }
};

export default notify;
