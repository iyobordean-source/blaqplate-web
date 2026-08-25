import { Link } from 'react-router-dom';
import { Gift, ShoppingBag, Clock } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import { useCountdown, formatCountdown } from '../hooks/useCountdown';
import { REDEMPTION_DATE, AVAILABLE_BONUS } from '../data/rewardsData';

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

function Rewards() {
  const timeLeft = useCountdown(REDEMPTION_DATE);

  return (
    <div className="dashboard-page-wrap">
      <DashboardHeader />

      <main className="dashboard-main rewards-page">
        <div className="rewards-hero">
          <p className="rewards-brand">
            BLAQ<span>PLATE</span>
          </p>
          <p className="rewards-heading">Monthly Bonus</p>

          <h1 className="rewards-amount">{formatNaira(AVAILABLE_BONUS)}</h1>
          <p className="rewards-caption">Your accumulated reward</p>

          {timeLeft.isComplete ? (
            <div className="rewards-ready-block">
              <p className="rewards-ready-title">🎉 Your bonus is ready!</p>
              <p className="rewards-ready-text">
                Use your {formatNaira(AVAILABLE_BONUS)} bonus on eligible BLAQ PLATE items.
              </p>
              <Link to="/menu">
                <Button className="btn-primary btn-large">
                  <ShoppingBag size={18} /> Browse Eligible Items
                </Button>
              </Link>
            </div>
          ) : (
            <div className="rewards-countdown-block">
              <p className="countdown-label">
                <Clock size={15} /> Redemption opens in
              </p>
              <p className="rewards-countdown-value">{formatCountdown(timeLeft)}</p>
            </div>
          )}
        </div>

        <p className="rewards-explainer">
          Earn 5% back on qualifying orders throughout the month. Your accumulated bonus
          becomes available at the monthly redemption date.
        </p>

        <div className="how-it-works">
          <h2>How It Works</h2>
          <div className="how-it-works-steps">
            <div className="how-step">
              <span className="how-step-number">1</span>
              <p>Order</p>
            </div>
            <div className="how-step">
              <span className="how-step-number">2</span>
              <p>Earn 5%</p>
            </div>
            <div className="how-step">
              <span className="how-step-number">3</span>
              <p>Wait for monthly redemption</p>
            </div>
            <div className="how-step">
              <span className="how-step-number">4</span>
              <p>Redeem your bonus</p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default Rewards;