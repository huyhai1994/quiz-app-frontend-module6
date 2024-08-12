import React, {useEffect, useState} from 'react';
import {Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, OutlinedInput} from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

const OptionCreate = () => {
    const [options, setOptions] = useState([
        {optionText: '', isCorrect: false},
        {optionText: '', isCorrect: false},
        {optionText: '', isCorrect: false},
        {optionText: '', isCorrect: false}
    ]);
    const [questionId, setQuestionId] = useState(null);

    useEffect(() => {
        const storedQuestionId = localStorage.getItem('questionId');
        if (storedQuestionId) {
            setQuestionId(parseInt(storedQuestionId, 10));
        }
    }, []);

    const handleOptionChange = (index, field, value) => {
        const newOptions = [...options];
        newOptions[index][field] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!questionId) {
            Swal.fire('Thất bại', 'Không tìm thấy questionId trong localStorage', 'error');
            return;
        }
        const url = `http://localhost:8080/option/create/${questionId}`;

        try {
            await axios.post(url, options);
            Swal.fire({
                title: "Thành công",
                text: "Tùy chọn đã được tạo",
                icon: "success"
            });
        } catch (error) {
            Swal.fire('Thất bại', error.response?.data || 'Xin vui lòng kiểm tra lại thông tin vừa nhập!', 'error');
            console.error("Error creating option", error);
        }
    };

    return (
        <Box sx={{
            maxWidth: 600,
            margin: 'auto',
            mt: 4,
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: 3,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <form onSubmit={handleSubmit}>
                {options.map((option, index) => (
                    <FormControl fullWidth margin="normal" key={index}>
                        <InputLabel shrink htmlFor={`option-${index}`}>Tùy chọn {index + 1}</InputLabel>
                        <OutlinedInput
                            id={`option-${index}`}
                            name={`option-${index}`}
                            value={option.optionText}
                            onChange={(e) => handleOptionChange(index, 'optionText', e.target.value)}
                            placeholder={`Nhập tùy chọn ${index + 1}`}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={option.isCorrect}
                                    onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                                />
                            }
                            label="Đúng"
                        />
                    </FormControl>
                ))}
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Tạo tùy chọn
                </Button>
            </form>
        </Box>
    );
};

export default OptionCreate;
