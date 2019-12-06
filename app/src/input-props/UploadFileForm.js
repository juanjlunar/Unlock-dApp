import FileInput from '../components/FileInput';
import TextInput from '../components/TextInput';

const errors = {
    file: 'Please select a file first.',
    fileName: 'Please fill out the name field.',
    fileDescription: 'Please fill out the description field.',
    fileGoal: 'Please fill out the goal field..'
};

export function getInputProps() {
    return [
        {
            id: 'file',
            h2: 'Upload new file',
            label: 'Select file',
            input: FileInput,
            onChange: this.getFile,
            required: true,
            value: ''
        },
        {
            id: 'fileGoal',
            label: 'Goal',
            className: 'goal-input',
            input: TextInput,
            onChange: this.getFileGoal,
            required: true,
            value: ''
        },
        {
            id: 'fileName',
            label: 'Name',
            input: TextInput,
            onChange: this.getFileName,
            required: true,
            value: ''
        },
        {
            id: 'fileDescription',
            label: 'Description',
            input: TextInput,
            onChange: this.getFileDescription,
            required: true,
            type: 'textarea',
            value: ''
        },
    ];
}
export function getInputError(key) {
    return errors[key];
}