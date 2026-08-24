import Button from './Button';

function BonusCard() {
  return (
    <div className="bonus-card">
      <div className="bonus-card-info">
        <p className="bonus-label">Your Monthly Bonus</p>
        <h3>5% Reward</h3>
        <p className="bonus-amount">₦2,500 available</p>
      </div>
      <Button className="btn-outline" onClick={() => alert('Rewards page coming soon')}>
        View Rewards
      </Button>
    </div>
  );
}

export default BonusCard;