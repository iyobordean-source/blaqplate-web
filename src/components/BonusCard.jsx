import { useNavigate } from 'react-router-dom';
import { Gift } from 'lucide-react';
import Button from './Button';
import { useCountdown, formatCountdown } from '../hooks/useCountdown';
import { REDEMPTION_DATE, AVAILABLE_BONUS } from '../data/rewardsData';

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

function BonusCard() {
  const navigate = useNavigate();
  const timeLeft = useCountdown(REDEMPTION_DATE);

  return (
    <div className="bonus-card">
      <div className="bonus-card-info">
        <p className="bonus-label">
          <Gift size={16} /> Monthly Bonus
        </p>
        <p className="bonus-sub">Earn 5% back on your orders</p>

        <h3>{formatNaira(AVAILABLE_BONUS)}</h3>

        {timeLeft.isComplete ? (
          <p className="bonus-ready-text">Your bonus is ready to redeem! 🎉</p>
        ) : (
          <div className="bonus-countdown">
            <span className="countdown-label">Redemption opens in</span>
            <span className="countdown-value">{formatCountdown(timeLeft)}</span>
          </div>
        )}
      </div>

      <Button className="btn-outline" onClick={() => navigate('/rewards')}>
        View Bonus
      </Button>
    </div>
  );
}

export default BonusCard;