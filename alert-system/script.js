// Common functions
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Redirect logic
    if (currentPage === 'index.html' && isLoggedIn) {
        window.location.href = 'admin.html';
    } else if (currentPage !== 'index.html' && !isLoggedIn) {
        window.location.href = 'index.html';
    }
    
    // Logout functionality
    const logoutButtons = document.querySelectorAll('#logoutBtn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    });
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation (for school project)
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'admin.html';
            } else {
                alert('Invalid credentials. Try admin/admin123 for demo.');
            }
        });
    }
    
    // Receipt generation page logic
    if (currentPage === 'generate.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const receiptType = urlParams.get('type');
        
        if (receiptType === 'deposit') {
            document.getElementById('depositFields').style.display = 'block';
            document.title = 'Generate Deposit Receipt';
        } else if (receiptType === 'withdrawal') {
            document.getElementById('withdrawalFields').style.display = 'block';
            document.title = 'Generate Withdrawal Email';
        }
        
        const receiptForm = document.getElementById('receiptForm');
        if (receiptForm) {
            receiptForm.addEventListener('submit', function(e) {
                e.preventDefault();
                generateReceipt(receiptType);
            });
        }
        
        // Print button
        const printBtn = document.getElementById('printBtn');
        if (printBtn) {
            printBtn.addEventListener('click', function() {
                window.print();
            });
        }
        
        // Save as image button
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                alert('In a real implementation, this would save the receipt as an image. For this demo, you can use print and save as PDF.');
            });
        }
    }
});

function generateReceipt(type) {
    const previewContent = document.getElementById('previewContent');
    previewContent.innerHTML = '';
    
    if (type === 'deposit') {
        // Get form values
        const amount = document.getElementById('amount').value || '6 USDT';
        const confirmations = document.getElementById('confirmations').value || '20 / 15';
        const network = document.getElementById('network').value || 'BSC';
        const wallet = document.getElementById('wallet').value || 'Spot Wallet';
        const address = document.getElementById('address').value || '0x3b5d7a699e152fbc2b43db2c690014e06b51c14d';
        const txid = document.getElementById('txid').value || '0xcbf9671b577c3e32c06242a905200588c595f46dea600fd6947dde5d06486d91';
        const date = document.getElementById('date').value || '2023-05-28 20:48:01';
        const spotPrice = document.getElementById('spotPrice').value || '27,224.69 +2.10%';
        
        // Generate deposit receipt HTML
        const receiptHTML = `
            <div class="deposit-receipt">
                <h1>Deposit Details</h1>
                
                <h2>Amount</h2>
                <div>${amount}</div>
                <div class="status">Completed</div>
                <div>Crypto has arrived in your Binance account. View your spot account balance for more details.</div>
                
                <div class="divider"></div>
                
                <h2>Confirmations</h2>
                <div>${confirmations}</div>
                
                <div class="detail-row">
                    <div class="detail-label"><strong>Network</strong></div>
                    <div class="detail-value"><strong>${network}</strong></div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label"><strong>Deposit Wallet</strong></div>
                    <div class="detail-value"><strong>${wallet}</strong></div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Address:</div>
                    <div class="detail-value address">${address}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">TXid:</div>
                    <div class="detail-value address">${txid}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Date:</div>
                    <div class="detail-value">${date}</div>
                </div>
                
                <div class="divider"></div>
                
                <div class="detail-row">
                    <div class="detail-label">Spot</div>
                    <div class="detail-value">BTC/USDT<br>${spotPrice}</div>
                </div>
                
                <div class="mt-3"><strong>Discover Now</strong></div>
            </div>
        `;
        
        previewContent.innerHTML = receiptHTML;
        
    } else if (type === 'withdrawal') {
        // Get form values
        const amount = document.getElementById('withdrawAmount').value || '500 USDT';
        const date = document.getElementById('withdrawDate').value || '2024-01-16 9:15:03(UTC)';
        
        // Generate withdrawal email HTML
        const receiptHTML = `
            <div class="email-receipt">
                <div class="email-header">
                    <strong>[Binance] USDT Withdrawal Confirmed - ${date}</strong>
                </div>
                
                <div class="email-body">
                    <div class="email-title">USDT Withdrawal Successful</div>
                    
                    <div class="email-message">
                        Your withdrawal of ${amount} has been processed from your Binance account. 
                        Log in to check your transaction history. Read our FAQs if you are running into problems.
                    </div>
                    
                    <div class="divider"></div>
                    
                    <a href="#" class="btn-email">Visit Your Dashboard</a>
                    
                    <div class="email-message">
                        Don't recognize this activity? Please reset your password and contact customer support immediately.
                    </div>
                    
                    <div class="text-muted mt-3">
                        <em>This is an automated message, please do not reply.</em>
                    </div>
                </div>
                
                <div class="divider"></div>
                
                <div class="email-footer">
                    <div><strong>Stay connected!</strong></div>
                    <div class="mt-2">To stay secure, setup your phishing code here</div>
                    
                    <div class="risk-warning mt-3">
                        <strong>Risk warning:</strong> Cryptocurrency trading is subject to high market risk. 
                        Binance will make the best efforts to choose high-quality coins, but will not be responsible 
                        for your trading losses. Please trade with caution. <strong>Kindly note:</strong> Please be 
                        aware of phishing sites and always make sure you are visiting the official Binance.com 
                        website when entering sensitive data.
                    </div>
                </div>
            </div>
        `;
        
        previewContent.innerHTML = receiptHTML;
    }
    
    // Show the preview
    document.getElementById('receiptPreview').style.display = 'block';
}