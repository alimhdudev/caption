import React from 'react';

class CleanupButton extends React.Component {
    handleClick = () => {
        fetch('http://localhost:8080/api/cleanup', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render() {
        return (
            <button onClick={this.handleClick} className='bg-[#006BFF] text-white p-4 mt-5 rounded-xl'>
                Reset
            </button>
        );
    }
}

export default CleanupButton;
