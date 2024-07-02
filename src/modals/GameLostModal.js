import React from 'react';
import PropTypes from 'prop-types';

const GameLostModal = ({ show, isWin, onRetrySameGraph, onTryNewGraph, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{isWin ? 'Congratulations!' : 'Game Over'}</h5>
                        <button type="button" className="close" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {isWin ? (
                            <>
                                <p>Congratulations! You completed the challenge within the optimal time range.</p>
                                <p>What would you like to do next?</p>
                            </>
                        ) : (
                            <>
                                <p>Oops! You lost the game as you couldn't finish in the indicated time.</p>
                                <p>What would you like to do?</p>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={onRetrySameGraph}>
                            {isWin ? 'Play Again' : 'Retry Same Graph'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onTryNewGraph}>
                            Try New Graph
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

GameLostModal.propTypes = {
    show: PropTypes.bool.isRequired,
    isWin: PropTypes.bool.isRequired,
    onRetrySameGraph: PropTypes.func.isRequired,
    onTryNewGraph: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default GameLostModal;
