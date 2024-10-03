import { StoryFn as Story, Meta } from '@storybook/react'
import Card, { CardProps } from '.';

const meta: Meta = {
  title: 'Component/Card',
  component: Card,
  tags: ['autodocs']
};

export default meta

const Template: Story<CardProps> = (args) => {
  return (
    <div className='flex justify-center'>
      <Card {...args}>
        This is Card
      </Card>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = { className: 'flex justify-center h-[200px] min-w-[375px] bg-slate-100 mx-[15px] my-[17px] rounded-lg shadow-md text-center items-center' }