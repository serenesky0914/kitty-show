import { StoryFn as Story, Meta } from "@storybook/react";
import Modal, { ModalProps } from ".";
import data from "../../../public/data.json";

const meta: Meta = {
  title: "Component/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;

const Template: Story<ModalProps> = (args) => {
  return (
    <div className="flex justify-center">
      <Modal {...args}>This is Modal</Modal>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  item: data[0],
};
